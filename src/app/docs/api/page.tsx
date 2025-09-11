
"use client";

import React, {useEffect, useState} from "react";
import TitleContainer from "@/components/TitleContainer";
import {API_ENDPOINTS} from "@/lib/api";

interface OpenAPIPath {
    get?: {
        tags?: string[];
        operationId?: string;
        parameters?: {
            name: string;
            in: string;
            required: boolean;
            schema: {
                type: string;
            };
        }[];
        responses?: {
            [key: string]: {
                description: string;
                content?: {
                    [key: string]: {
                        schema?: {
                            type?: string;
                            $ref?: string;
                            items?: {
                                $ref?: string;
                            };
                        };
                    };
                };
            };
        };
    };
}

interface OpenAPIComponent {
    type?: string;
    properties?: {
        [key: string]: {
            type?: string;
            format?: string;
            $ref?: string;
        };
    };
}

interface OpenAPISpec {
    openapi: string;
    info: {
        title: string;
        version: string;
    };
    servers: {
        url: string;
        description: string;
    }[];
    paths: {
        [key: string]: OpenAPIPath;
    };
    components: {
        schemas: {
            [key: string]: OpenAPIComponent;
        };
    };
}

export default function APIDocsPage() {
    const [apiSpec, setApiSpec] = useState<OpenAPISpec | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [debugPaths, setDebugPaths] = useState<Record<string, boolean>>({});
    const [debugParams, setDebugParams] = useState<Record<string, Record<string, string>>>({});
    const [debugResponses, setDebugResponses] = useState<Record<string, { status: number; data: any; time: number; headers: Record<string, string> }>>({});
    const [debugLoading, setDebugLoading] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const fetchAPISpec = async () => {
            try {
                // This should be replaced with the actual API documentation JSON URL
                const response = await fetch("https://api.mohistmc.com/docs");
                if (!response.ok) {
                    throw new Error("Failed to fetch API documentation");
                }
                const data: OpenAPISpec = await response.json();
                setApiSpec(data);

                // Set default selected tag
                if (data.paths) {
                    const allTags = new Set<string>();
                    Object.values(data.paths).forEach(path => {
                        if (path.get?.tags) {
                            path.get.tags.forEach(tag => allTags.add(tag));
                        }
                    });
                    const tagsArray = Array.from(allTags);
                    if (tagsArray.length > 0) {
                        setActiveTag(tagsArray[0]);
                    }
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchAPISpec();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <h2 className="text-2xl font-bold mt-4 text-base-content">Loading API Documentation...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
                <div className="text-center">
                    <div className="text-error text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-base-content">Failed to Load</h2>
                    <p className="mt-2 text-base-content/70">{error}</p>
                    <button
                        className="btn btn-primary mt-4"
                        onClick={() => window.location.reload()}
                    >
                        Reload
                    </button>
                </div>
            </div>
        );
    }

    if (!apiSpec) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-base-content">API Documentation Not Found</h2>
                </div>
            </div>
        );
    }

    // Extract all unique tags
    const allTags = new Set<string>();
    Object.values(apiSpec.paths).forEach(path => {
        if (path.get?.tags) {
            path.get.tags.forEach(tag => allTags.add(tag));
        }
    });
    const tagsArray = Array.from(allTags);

    // Filter paths by tag
    const filteredPaths = Object.entries(apiSpec.paths).filter(([_, path]) => {
        if (!activeTag) return true;
        return path.get?.tags?.includes(activeTag);
    });

    // Resolve component references
    const resolveRef = (ref: string) => {
        if (ref.startsWith("#/components/schemas/")) {
            const schemaName = ref.substring(21); // Remove "#/components/schemas/" prefix
            return apiSpec.components.schemas[schemaName];
        }
        return null;
    };

    // Get response content type
    const getResponseContentType = (responses: any) => {
        if (responses && responses["200"] && responses["200"].content) {
            return Object.keys(responses["200"].content)[0] || "application/json";
        }
        return "application/json";
    };

    // Toggle debug panel
    const toggleDebugPanel = (path: string) => {
        setDebugPaths(prev => ({
            ...prev,
            [path]: !prev[path]
        }));

        // Initialize parameters
        if (!debugParams[path]) {
            const pathData = apiSpec.paths[path];
            if (pathData.get?.parameters) {
                const initialParams: Record<string, string> = {};
                pathData.get.parameters.forEach(param => {
                    initialParams[param.name] = "";
                });
                setDebugParams(prev => ({
                    ...prev,
                    [path]: initialParams
                }));
            }
        }
    };

    // Update parameter value
    const updateParamValue = (path: string, paramName: string, value: string) => {
        setDebugParams(prev => ({
            ...prev,
            [path]: {
                ...prev[path],
                [paramName]: value
            }
        }));
    };

    // Execute API request
    const executeRequest = async (path: string) => {
        // Set loading state
        setDebugLoading(prev => ({
            ...prev,
            [path]: true
        }));

        try {
            const startTime = Date.now();

            // Build URL
            let url = apiSpec.servers[0].url + path;

            // Replace path parameters
            const params = debugParams[path];
            if (params) {
                // Replace parameter placeholders in path
                Object.entries(params).forEach(([key, value]) => {
                    if (value) {
                        url = url.replace(`{${key}}`, encodeURIComponent(value));
                    }
                });

                // Add query parameters (only add parameters not in path)
                const pathData = apiSpec.paths[path];
                const pathParams = pathData.get?.parameters?.filter(p => p.in === "path").map(p => p.name) || [];
                const queryParams = new URLSearchParams();

                Object.entries(params).forEach(([key, value]) => {
                    // Only add parameters not in path as query parameters
                    if (value && !pathParams.includes(key)) {
                        queryParams.append(key, value);
                    }
                });

                if (queryParams.toString()) {
                    url += `?${queryParams.toString()}`;
                }
            }

            // Send request
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const endTime = Date.now();

            // Get response headers
            const headers: Record<string, string> = {};
            response.headers.forEach((value, key) => {
                headers[key] = value;
            });

            // Try to parse response data
            let responseData;
            const contentType = response.headers.get("content-type");

            try {
                if (contentType && contentType.includes("application/json")) {
                    responseData = await response.json();
                } else {
                    responseData = await response.text();
                }
            } catch {
                // If parsing fails, try to get text
                try {
                    responseData = await response.text();
                } catch {
                    responseData = "Unable to read response body";
                }
            }

            // Save response
            setDebugResponses(prev => ({
                ...prev,
                [path]: {
                    status: response.status,
                    data: responseData,
                    time: endTime - startTime,
                    headers
                }
            }));
        } catch (err) {
            setDebugResponses(prev => ({
                ...prev,
                [path]: {
                    status: 0,
                    data: err instanceof Error ? err.message : "Unknown error occurred",
                    time: 0,
                    headers: {}
                }
            }));
        } finally {
            setDebugLoading(prev => ({
                ...prev,
                [path]: false
            }));
        }
    };

    return (
        <section className="flex flex-col min-h-screen pt-8 bg-base-100 text-base-content">
            <TitleContainer
                titleKey="API Documentation"
                subtitleKey="Explore MohistMC's REST API and learn how to interact with our services."
                fromColor="from-info"
                toColor="to-primary"
            />

            <div className="flex-1 px-4 pb-8">
                <div className="max-w-screen-xl mx-auto">
                    {/* Server Information */}
                    <div className="bg-base-200 rounded-box border border-base-300 p-4 mb-4">
                        <h2 className="text-lg font-bold mb-3 text-base-content flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                            </svg>
                            Server Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {apiSpec.servers.map((server, index) => (
                                <div key={index} className="bg-base-100 p-3 rounded-box">
                                    <div className="font-medium text-base-content text-sm flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        {server.description}
                                    </div>
                                    <div className="text-xs font-mono bg-base-200 p-1.5 rounded mt-1.5 break-all">
                                        {server.url}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tag Navigation */}
                    <div className="bg-base-200 rounded-box border border-base-300 p-4 mb-6">
                        <h2 className="text-xl font-bold mb-4 text-base-content">API Endpoints</h2>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                className={`btn btn-sm ${!activeTag ? 'btn-primary' : 'btn-outline'}`}
                                onClick={() => setActiveTag(null)}
                            >
                                All
                            </button>
                            {tagsArray.map(tag => (
                                <button
                                    key={tag}
                                    className={`btn btn-sm ${activeTag === tag ? 'btn-primary' : 'btn-outline'}`}
                                    onClick={() => setActiveTag(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* API Path List */}
                        <div className="space-y-4">
                            {filteredPaths.map(([path, pathData]) => {
                                const method = pathData.get;
                                if (!method) return null;

                                const parameters = method.parameters || [];
                                const responses = method.responses || {};

                                return (
                                    <div key={path} className="bg-base-100 rounded-box border border-base-300 overflow-hidden">
                                        <div className="p-4 bg-base-200 border-b border-base-300">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <span className="badge badge-success badge-lg font-mono">GET</span>
                                                <span className="font-mono text-primary break-all">{path}</span>
                                                <button
                                                    className="btn btn-xs btn-ghost ml-auto"
                                                    onClick={() => toggleDebugPanel(path)}
                                                >
                                                    {debugPaths[path] ? "Close Debug" : "Debug"}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Debug Panel */}
                                        {debugPaths[path] && (
                                            <div className="p-4 bg-base-200 border-b border-base-300">
                                                <h3 className="text-lg font-semibold mb-3 text-base-content">API Debug</h3>

                                                {/* Parameter Input */}
                                                {parameters.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className="font-medium mb-3">Parameters</h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {parameters.map((param) => (
                                                                <div key={param.name} className="form-control">
                                                                    <label className="label pb-1">
                                                                        <span className="label-text font-mono text-sm">
                                                                            {param.name} {param.required && <span className="text-error">*</span>}
                                                                        </span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        placeholder={param.schema.type}
                                                                        className="input input-bordered input-sm ml-2"
                                                                        value={debugParams[path]?.[param.name] || ""}
                                                                        onChange={(e) => updateParamValue(path, param.name, e.target.value)}
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Execute Button */}
                                                <div className="mt-2 mb-4 flex flex-wrap gap-2">
                                                    <button
                                                        className={`btn btn-primary btn-sm ${debugLoading[path] ? "loading" : ""}`}
                                                        onClick={() => executeRequest(path)}
                                                        disabled={debugLoading[path]}
                                                    >
                                                        {debugLoading[path] ? "Executing..." : "Execute"}
                                                    </button>

                                                    {/* Copy Full URL Button - Only shown after successful request */}
                                                    {debugResponses[path] && debugResponses[path].status === 200 && (
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            onClick={() => {
                                                                // Build full URL
                                                                let url = `${API_ENDPOINTS.MOHISTMC_API}${path}`;
                                                                const params = debugParams[path];

                                                                if (params) {
                                                                    // Replace path parameters
                                                                    Object.entries(params).forEach(([key, value]) => {
                                                                        if (value) {
                                                                            url = url.replace(`{${key}}`, encodeURIComponent(value));
                                                                        }
                                                                    });

                                                                    // Add query parameters
                                                                    const pathData = apiSpec.paths[path];
                                                                    const pathParams = pathData.get?.parameters?.filter(p => p.in === "path").map(p => p.name) || [];
                                                                    const queryParams = new URLSearchParams();

                                                                    Object.entries(params).forEach(([key, value]) => {
                                                                        if (value && !pathParams.includes(key)) {
                                                                            queryParams.append(key, value);
                                                                        }
                                                                    });

                                                                    if (queryParams.toString()) {
                                                                        url += `?${queryParams.toString()}`;
                                                                    }
                                                                }

                                                                navigator.clipboard.writeText(url);
                                                                // Can add a notification that URL was copied
                                                            }}
                                                        >
                                                            Copy URL
                                                        </button>
                                                    )}
                                                </div>

                                                {/* Response Display */}
                                                {debugResponses[path] && (
                                                    <div className="mt-4 pt-4 border-t border-base-300">
                                                        <h4 className="font-medium mb-3">Response</h4>
                                                        <div className="bg-base-100 rounded-box p-4">
                                                            <div className="flex flex-wrap items-center gap-4 mb-3">
                                                                <div className="flex items-center">
                                                                    <span className="font-medium">Status:</span>
                                                                    <span className={`ml-2 badge ${debugResponses[path].status >= 200 && debugResponses[path].status < 300 ? "badge-success" : "badge-error"}`}>
                                                                        {debugResponses[path].status || "Error"}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center">
                                                                    <span className="font-medium">Time:</span>
                                                                    <span className="ml-2">{debugResponses[path].time} ms</span>
                                                                </div>
                                                            </div>

                                                            <div className="tabs tabs-boxed mb-3">
                                                                <button className="tab tab-active">Response Body</button>
                                                            </div>

                                                            <div className="overflow-x-auto">
                                                                <pre className="text-xs bg-base-300 p-4 rounded-box max-h-60 overflow-y-auto whitespace-pre-wrap">
                                                                    {typeof debugResponses[path].data === "string"
                                                                        ? debugResponses[path].data
                                                                        : JSON.stringify(debugResponses[path].data, null, 2)}
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        <div className="p-4">
                                            {/* Parameters Section */}
                                            {parameters.length > 0 && (
                                                <div className="mb-6">
                                                    <h3 className="text-lg font-semibold mb-3 text-base-content">Parameters</h3>
                                                    <div className="overflow-x-auto">
                                                        <table className="table table-zebra">
                                                            <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Location</th>
                                                                <th>Required</th>
                                                                <th>Type</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            {parameters.map((param, index) => (
                                                                <tr key={index}>
                                                                    <td className="font-mono">{param.name}</td>
                                                                    <td>{param.in}</td>
                                                                    <td>{param.required ? 'Yes' : 'No'}</td>
                                                                    <td>{param.schema.type}</td>
                                                                </tr>
                                                            ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Response Section */}
                                            <div>
                                                <h3 className="text-lg font-semibold mb-3 text-base-content">Responses</h3>
                                                <div className="space-y-4">
                                                    {Object.entries(responses).map(([code, response]) => (
                                                        <div key={code} className="bg-base-200 p-4 rounded-box">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className={`badge ${code === "200" ? "badge-success" : "badge-warning"}`}>
                                                                  {code}
                                                                </span>
                                                                <span className="text-base-content">{response.description}</span>
                                                            </div>

                                                            {response.content && Object.entries(response.content).map(([contentType, content]) => (
                                                                <div key={contentType} className="mt-2">
                                                                    {content.schema && (
                                                                        <div className="mt-2">
                                                                            {content.schema.$ref ? (
                                                                                <div>
                                                                                    {/* Display referenced schema details */}
                                                                                    {(() => {
                                                                                        const schema = resolveRef(content.schema.$ref);
                                                                                        if (schema && schema.properties) {
                                                                                            return (
                                                                                                <div className="mt-2 overflow-x-auto">
                                                                                                    <table className="table table-xs">
                                                                                                        <thead>
                                                                                                        <tr>
                                                                                                            <th>Field</th>
                                                                                                            <th>Type</th>
                                                                                                        </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                        {Object.entries(schema.properties).map(([propName, prop]) => (
                                                                                                            <tr key={propName}>
                                                                                                                <td className="font-mono">{propName}</td>
                                                                                                                <td>
                                                                                                                    {prop.$ref ? (
                                                                                                                        <span className="font-mono text-sm">{prop.$ref}</span>
                                                                                                                    ) : (
                                                                                                                        <span>{prop.type}{prop.format ? ` (${prop.format})` : ''}</span>
                                                                                                                    )}
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        ))}
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                        return null;
                                                                                    })()}
                                                                                </div>
                                                                            ) : content.schema.type === "array" && content.schema.items?.$ref ? (
                                                                                <div>
                                                                                    {/* Display array item schema details */}
                                                                                    {(() => {
                                                                                        const schema = resolveRef(content.schema.items.$ref);
                                                                                        if (schema && schema.properties) {
                                                                                            return (
                                                                                                <div className="mt-2 overflow-x-auto">
                                                                                                    <table className="table table-xs">
                                                                                                        <thead>
                                                                                                        <tr>
                                                                                                            <th>Field</th>
                                                                                                            <th>Type</th>
                                                                                                        </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                        {Object.entries(schema.properties).map(([propName, prop]) => (
                                                                                                            <tr key={propName}>
                                                                                                                <td className="font-mono">{propName}</td>
                                                                                                                <td>
                                                                                                                    {prop.$ref ? (
                                                                                                                        <span className="font-mono text-sm">{prop.$ref}</span>
                                                                                                                    ) : (
                                                                                                                        <span>{prop.type}{prop.format ? ` (${prop.format})` : ''}</span>
                                                                                                                    )}
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        ))}
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                            );
                                                                                        }
                                                                                        return null;
                                                                                    })()}
                                                                                </div>
                                                                            ) : (
                                                                                <div className="text-sm text-base-content/70">
                                                                                    Type: <span className="font-mono">{content.schema.type}</span>
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
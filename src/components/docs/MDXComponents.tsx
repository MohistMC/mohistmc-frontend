import React from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import dracula from 'react-syntax-highlighter/dist/esm/styles/prism/gruvbox-dark';

const MDXComponents = {
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h1 className="text-3xl md:text-4xl font-bold my-4" {...props} />
    ),
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h2 className="text-2xl md:text-3xl font-bold my-3" {...props} />
    ),
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h3 className="text-xl md:text-2xl font-bold my-2" {...props} />
    ),
    h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
        <h4 className="text-lg md:text-xl font-bold my-2" {...props} />
    ),

    p: (props: React.HTMLProps<HTMLParagraphElement>) => (
        <p className="my-3 text-base md:text-lg whitespace-pre-wrap" {...props} />
    ),

    a: (props: React.HTMLProps<HTMLAnchorElement>) => (
        <a className="link link-primary text-base md:text-lg" {...props} />
    ),

    ul: (props: React.HTMLProps<HTMLUListElement>) => (
        <ul className="list-disc list-inside my-2 text-base md:text-lg" {...props} />
    ),
    li: (props: React.HTMLProps<HTMLLIElement>) => (
        <li className="my-1 text-base md:text-lg" {...props} />
    ),

    blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-base md:text-lg" {...props} />
    ),

    code: (props: { [x: string]: any; children: any; className: any; }) => {
        const { children, className, ...rest } = props;
        const match = /language-(\w+)/.exec(className || '');

        if (!match) {
            return (
                <code className="bg-base-200 text-base-content px-1.5 py-0.5 rounded text-xs md:text-sm font-mono" {...rest}>
                    {children}
                </code>
            );
        }

        return (
            <div className="rounded-lg">
                <div className="flex items-center justify-between px-4 py-2 bg-base-200 dark:bg-base-700 text-base-content">
                    <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-error"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-warning"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-success"></div>
                    </div>
                </div>
                <SyntaxHighlighter
                    language={match[1]}
                    PreTag="div"
                    style={dracula}
                    className="m-0 [&_*]:!rounded-none [&_*]:!bg-transparent [&_*]:!border-none [&_*]:!outline-none [&_pre]:!m-0 [&_code]:!p-0"
                    showLineNumbers={false}
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 0.5rem 0.5rem',
                        padding: '1rem',
                        whiteSpace: 'pre',
                        wordBreak: 'normal',
                        overflow: 'auto'
                    }}
                    codeTagProps={{
                        style: {
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        },
                    }}
                    {...rest}
                >
                    {typeof children === 'string' ? children.trim() : String(children)}
                </SyntaxHighlighter>
            </div>
        );
    },

    pre: (props: { children: any; }) => {
        return <>{props.children}</>;
    },

    div: (props: React.HTMLProps<HTMLDivElement>) => <div {...props} />,
    input: (props: React.HTMLProps<HTMLInputElement>) => (
        <input className="input input-bordered" {...props} />
    ),
};

export default MDXComponents;

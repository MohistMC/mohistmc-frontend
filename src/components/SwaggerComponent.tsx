import React from "react";
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import {getAPIEndpoint} from "@/util/Environment";

export default function SwaggerComponent({onComplete}: { onComplete: () => void }) {
    return <SwaggerUI url={`${getAPIEndpoint()}/docs/json`} docExpansion="list" onComplete={onComplete}/>
}
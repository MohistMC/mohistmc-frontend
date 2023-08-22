import React from "react";
import dynamic from 'next/dynamic'
import "swagger-ui-react/swagger-ui.css"
import {getAPIEndpoint} from "@/util/Environment";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {ssr: false});

export default function SwaggerComponent({onComplete}: { onComplete: () => void }) {
    return <SwaggerUI url={`${getAPIEndpoint()}/docs/json`} docExpansion="list" onComplete={onComplete}/>
}
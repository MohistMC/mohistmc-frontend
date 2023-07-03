import React from "react";
import dynamic from 'next/dynamic'
import "swagger-ui-react/swagger-ui.css"

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {ssr: false});

export default () => <SwaggerUI url="https://new-api.mohistmc.com/docs/json" docExpansion="list"/>
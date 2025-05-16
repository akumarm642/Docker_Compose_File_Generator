export function validateDockerComposeConfig(config:any) {
    const errors: string[] = [];
    
    if(!config.services || typeof config.services !== 'object'){
        errors.push("missing or invalid 'services' field.");
        return errors;
    }

    for(const [serviceName, service] of Object.entries<any>(config.services)){
        if(!service.image && !service.build){
            errors.push(`Service '${serviceName}' must have either 'image' or 'build'`);
        }

        if(service.ports){
            for(const port of service.ports){
                if (!/^\d+(:\d+)?$/.test(port)){
                    errors.push(`Invalid port format '${port}' in service '${serviceName}'.`);
                }
            }
        }

        //Future implementation

    }
    return errors;
}
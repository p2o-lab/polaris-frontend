export interface Module {
    id: string;
    c: number;
    r: number;
    inputPorts: string[];
    outputPorts: string[];
    kpi: number[];
    opcua_server_url: string;
    rest_api_port: string;
    services: number[];
    com_init: boolean;   // if set to false -> ns has not been replaced -> module has no communication
    namespace: object;
    nsIDMap: object;
}

/** Type descriptions for ELK (Eclipse Layout Kernel) JSON
 * https://www.eclipse.org/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html
 */

export interface ElkJsonInterface {
    children: ElkNode[];
    edges: ElkEdge[];
}

export interface ElkObject {
    id: string;
    layoutOptions?: object;
}

export interface ElkNodePortLabel extends ElkObject {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    labels?: ElkLabel[];
}

export interface ElkNode extends ElkNodePortLabel {
    ports?: ElkPort[];
    children?: ElkNode[];
    edges?: ElkEdge[];
}

// tslint:disable-next-line:no-empty-interface
export interface ElkPort extends ElkNodePortLabel {

}

export type ElkEdge = ElkPrimitiveEdge | ElkExtendedEdge;

export interface ElkPoint {
    x: number;
    y: number;
}

export interface ElkLabel extends ElkObject {
    text: string;
}

export interface ElkPrimitiveEdge extends ElkObject {
    source: string;
    sourcePort?: string;
    target: string;
    targetPort?: string;
    sourcePoint?: ElkPoint;
    targetPoint?: ElkPoint;
    bendPoints?: ElkPoint[];
    labels?: ElkLabel[];
}

export interface ElkExtendedEdge extends ElkObject {
    sources: string[];
    targets: string[];
    sections?: ElkEdgeSection[];
    labels?: ElkLabel[];
}

export interface ElkEdgeSection extends ElkObject {
    startPoint: ElkPoint;
    endPoint: ElkPoint;
    bendPoints?: ElkPoint[];
    incomingShape?: string;
    outgoingShape?: string;
    incomingSections?: ElkEdgeSection[];
    outgoingSections?: ElkEdgeSection[];
}

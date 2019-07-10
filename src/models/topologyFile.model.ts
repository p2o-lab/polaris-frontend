import { Subplant } from './subplant.model';
import { Module } from './module.model';
import { NamedNodeCollection } from './named-node-collection.model';
import { Strategy } from './strategy.model';
import { Node } from './node.model';
import { Service } from './service.model';
import { Port } from './port.model';
import { Connection } from './connection.model';
import { NamedNode } from './named-node.model';

export interface TopologyFile {
    subplants: Subplant[];
    modules: Module[];
    strategies: Strategy[];
    nodes: Node[];
    namedNodeCollections: NamedNodeCollection[];
    namedNodes: NamedNode[];
    services: Service[];
    ports: Port[];
    connections: Connection[];
}

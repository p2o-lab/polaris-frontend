export interface Node {
  id: string;
  name: string;
  namespace_index?: string | number;
  node_id?: string | number;
  data_type?: string;
  value?: string;
}

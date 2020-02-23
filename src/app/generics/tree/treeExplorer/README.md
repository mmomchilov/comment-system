# Tree Explorer

## Inputs

* Main

Name                |Type       |  Description                                 | Default Value
------------------- | --------- |--------------------------------------------- | ---------------
nodes               | Object    | Nodes to display                             | 
enableAddButton     | boolean   | If true, new nodes can be added              | false

* Tree Node

Name                |Type       |  Description                                 | Default Value
------------------- | --------- |--------------------------------------------- | ---------------
allowAddSubnodes    | boolean   | If sub-node can be added to an existing one  | true
delete              | Object    | Delete configurations                        | 

* Delete Configuration

Name                |Type       |  Description                                 | Default Value
------------------- | --------- |--------------------------------------------- | ---------------
allowDelete         | boolean   | If an existing node can be deleted           | true
confirmDelete       | Function  | Lambda function which confirm deletion       | 
hasChildNodes       | boolean   | If has at least one child                    | false

* Widget List

Name                | Type      | Description                                  | Default Value  
------------------- | --------- |--------------------------------------------- | ---------------
display             | Object    | Configuration for node details               |

## Dependencies

* Tree Node
* [Widget List](../../contentContainer/README.md)

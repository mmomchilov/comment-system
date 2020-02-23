# Simple Inputs

## Description

Generic component multiple controls using configuration. It manages storage in the given collection and dependencies between controls. 

The following widgets are available:
* Input
* Dropdown
* Check box
* Date
* Buttons - user, reload

## Inputs

* Main

Name                |Type                   |  Description                                      | Default Value
------------------- | --------------------- |-------------------------------------------------- |------
locale              | string                | Locale                                               | 'fr'
parentId            | string                | Parent identifier for uniqueness                     | ''
displayMode         | string                | Display mode. Specifies if edit is allowed           |
database            | string                | Database name                                        |
collectionId        | string                | Collection identifier                                |
collection          | any                   | Collection to display/edit                           |
originalCollection  | any                   | Original collection                                  |
content             | CardContentConfiguration| Content configuration                              |
columnSize          | number                | What part of the screen to take (bootstrap is used)  |

## Outputs

Name                | Description
------------------- | ---------------------------------------------------------
valueChanged        | Triggered when some value is changed

## Dependencies


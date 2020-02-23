# Content Container

## Description

Generic component containing different types of inputs: select, edit, date picker, check box, smart table, add-remove table

## Inputs

* Main

Name                |Type                   |  Description
------------------- | --------------------- |---------------------------------------------
displayMode         | string                | Display mode. Specifies if edit is allowed
database            | string                | Database name
collectionId        | string                | Collection identifier
collection          | any                   | Collection to display/edit
originalCollection  | any                   | Collection that will not be edited
configs             | ContentConfiguration  | Settings for view table component 
cards               | FormArray             | Form array to add the content to

## Outputs

Name                | Description
------------------- | ---------------------------------------------------------


## Dependencies


## Examples

* Configs input:
```
{
    selectedTab: 'description',
    tabs: [{
             field: 'description',
             filterName: 'description',
             label: 'Description'
            },
            {
             field: 'fields',
             filterName: 'fields',
             label: 'Calculation fields'
            }],
    list:[
        {
         type:ContentType.SIMPLE_INPUTS, 
         fields:[[
                    {
                     field: 'fld1',
                     type: 'select',
                     columnSize: 4
                    }
                ]]
        }
    ]
```
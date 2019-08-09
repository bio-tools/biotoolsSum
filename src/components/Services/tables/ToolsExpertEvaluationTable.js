import React, {Component} from "react";
import {configRatingsKeys, configRatings} from '../../../biotoolsSum/common/helperFunctions'
import ReactTable from "react-table";


export default class ToolsExpertEvaluationTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {list} = this.props;
        const columns = [{
            Header: 'Tool',
            id: 'name',
            accessor: ({name}) => name,
            sortable: true,
            sortMethod: (a, b) => {
                return a.toLowerCase() > b.toLowerCase() ? 1 : -1
            },
            getProps: () => {
                return {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            filterable: true,
            filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
        }];

        Object.keys(configRatingsKeys).forEach(key => {
            const label = configRatingsKeys[key];
            columns.push({
                Header: label,
                id: key,
                accessor: ({id}) => configRatings[id] ? configRatings[id][key] : null,
                sortable: true,
                sortMethod: (a, b) => {
                    return a - b
                },
                filterable: true,
                getProps: (state, rowInfo, column) => {
                    let background = null;
                    switch (rowInfo.row[key]) {
                        case 5:
                            background = '#5cb85c';
                            break;
                        case 1:
                            background = '#d9534f';
                    }
                    return {
                        style: {
                            textAlign: 'center',
                            background: background,
                        },
                    };
                },
            })
        });

        return (
            <ReactTable
                columns={columns}
                data={list}
                minRows={1}
            />
        )
    }
}

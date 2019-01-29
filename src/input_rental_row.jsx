const React = require('react');

const InputRentalRow = (props) => {
    return (
        <tr>
            <td>
                {props.currentRow.name}
            </td>
            <td>
                {props.currentRow.sf} SF
            </td>
            <td>
                {props.currentRow.amount} {props.currentRow.type}
            </td>
            <td>
                Mo. {props.currentRow.moveIn} / Mo. {props.currentRow.moveOut}
            </td>
            <td>
                {props.currentRow.serviceType}
            </td>
            <td>
                <button name={props.currentRow.id} onClick={props.openModal}>Edit</button>
            </td>
        </tr>
    )
}

module.exports = InputRentalRow;
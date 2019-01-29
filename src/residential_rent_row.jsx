const React = require('react');

const ResidentialRow = (props) => {
    return (
        <tr>
            <td>
                {props.currentRow.name}
            </td>
            <td>
                {props.currentRow.sf} SF
            </td>
            <td>
                {props.currentRow.amount}/Month
            </td>
            <td>
             {props.currentRow.bedrooms} / {props.currentRow.bathrooms}
            </td>
            <td>
                {props.currentRow.quantity}
            </td>
            <td>
                <button name={props.currentRow.id} onClick={props.openModal}>Edit</button>
            </td>
        </tr>
    )
}

module.exports = ResidentialRow;
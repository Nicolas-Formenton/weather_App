import { format } from 'date-fns';

//Essa função serve para alterar como a datas sao escritas no HTML
// para dd/mm/aa
function FormatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return ` ${hour}h - ${day}/${month}/${year}  `;
}


export default FormatDate;
let data = {
    methods : {
        toRupiah(val) {
            return `Rp. ${this.formatMoney(Number(val))}`      
        },
        formatMoney(amount, decimalCount = 2, thousands = ".") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
            
                const negativeSign = amount < 0 ? "-" : "";
                amount = Math.abs(Number(amount) || 0).toFixed(decimalCount);
                let i = parseInt(amount).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;
            
                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
            } catch (e) {
                return '0,00'
            }
        }
    }
}
export default data 
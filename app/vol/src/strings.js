import moment from 'moment'

String.prototype.standardizeName = function(){
    var str = this
    str = str.replaceAll('.', ' ')
    str = str.replace(/  +/g, ' ')
    str = str.trim()
    var parts = str.split(" ")
    if(parts.length!=str.replaceAll(" ","").length){
      while(parts[0].length==1){
        parts.push(parts.shift())
      }
    }
    str=parts.join(" ")
    return str.toTitleCase()
}

String.prototype.toCamelCase = function() {
    return this.toLowerCase()
      .replace( /['"]/g, '' )
      .replace( /\W+/g, ' ' )
      .replace( / (.)/g, function($1) { return $1.toUpperCase(); })
      .replace( / /g, '' );
  }
  
  String.prototype.toTitleCase = function() {
    return this.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  String.prototype.toTimingCase = function() {

    return this.trim()==""?"":this.split("and").map(t=>{
      return t.trim().split("-").map(p=>{
        const min = Math.ceil((parseFloat(p)-parseInt(p))*60)
        return moment(`${parseInt(p)%24}:${min}`, "HH:mm").format(`h${min>0?".mm":''} A`)
      }).join(" - ")
    }).join(" and ")
  }


  String.prototype.replaceLastOccurance = function(a, b) {
    const lastIndex = this.lastIndexOf(', ');
    if (lastIndex !== -1) {
      const stringWithoutLastCommaSpace = this.substring(0, lastIndex) + ' & ' + this.substring(lastIndex + 2);
      return stringWithoutLastCommaSpace;
    }
    return this;
  }



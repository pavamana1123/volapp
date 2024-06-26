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

  Array.prototype.unique = function() {
    const uniqueArray = [];
    const seenStrings = {};
  
    for (let i = 0; i < this.length; i++) {
      if (!seenStrings[this[i]]) {
        uniqueArray.push(this[i]);
        seenStrings[this[i]] = true;
      }
    }
  
    return uniqueArray;
  }

  Array.prototype.split = function(n) {
    if (n <= 0) {
      throw new Error("Number of parts must be a positive integer.");
    }
  
    const partSize = Math.ceil(this.length / n);
    const splitArrays = [];
  
    for (let i = 0; i < this.length; i += partSize) {
      splitArrays.push(this.slice(i, i + partSize));
    }
  
    return splitArrays;
  }

  Array.prototype.shard = function(n, pad) {
    if (n <= 0) {
      throw new Error("Shard size must be a positive integer.");
    }
  
    const shardArrays = [];
    let currentIndex = 0;
  
    while (currentIndex < this.length) {
      shardArrays.push(this.slice(currentIndex, currentIndex + n));
      currentIndex += n;
    }


    if(!shardArrays.length){
      return shardArrays
    }
   
    var lastLength = shardArrays[shardArrays.length-1].length
    if(shardArrays.length && pad && lastLength<n){
      for(let i=0; i<n-lastLength; i++){
        shardArrays[shardArrays.length-1].push(pad)
      }
    }
  
    return shardArrays;
  }


  Array.prototype.deskShard = function(numGroups) {

    const getPrev = letter => /^[A-Z]$/.test(letter)
    ? String.fromCharCode(letter.charCodeAt(0) - 1 + 26 * (letter === 'A'))
    : 'Invalid input';

    this.sort()
    const groups = Array.from({ length: numGroups }, () => []);
    const namesPerGroup = Math.ceil(this.length / numGroups);
    for (let i = 0; i < this.length; i++) {
        const groupIndex = Math.floor(i / namesPerGroup);
        groups[groupIndex].push(this[i]);
    }
    return groups.map((g, gg, ggg)=>{
      return `${g[0][0].toUpperCase()}-${gg!=ggg.length-1?getPrev(g[g.length-1][0].toUpperCase()):g[g.length-1][0].toUpperCase()}`
    })
  }

  Array.prototype.interleave = function(insert, interval) {
    if (interval <= 0) {
      return this.slice(); 
    }
  
    const res = [];
    for (let i = 0; i < this.length; i++) {
      if (i > 0) {
        if (i % interval === 0) {
          res.push(insert);
        }
      }
      res.push(this[i]);
    }
  
    return res;
  }

  Array.prototype.unique = function() {
    let x = {}
    this.forEach(e=>{
      x[e]=0
    })

    return Object.keys(x)
  }

  Array.prototype.sonique = function() {
    return this.unique().sort()
  }

  Array.prototype.interleave = function(element, last = false) {
    const result = []
  
    for (let i = 0; i < this.length; i++) {
      result.push(this[i])
      
      if (i < this.length - 1 || (i === this.length - 1 && last)) {
        result.push(element)
      }
    }
  
    return result
  }

  Array.prototype.maxColWidth = function() {
    if (this.length === 0 || this[0].length === 0) {
        return []
    }

    const numCols = this[0].length
    const result = []

    for (let col = 0; col < numCols; col++) {
        let maxLength = 0

        for (let row = 0; row < this.length; row++) {
            const currentLength = this[row][col].length

            if (currentLength > maxLength) {
                maxLength = currentLength
            }
        }

        result.push(maxLength)
    }

    return result;
}



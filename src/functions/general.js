function deep_value(obj, path, alternativeValue) {
   
    for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
        
        if (obj.hasOwnProperty(path[i])) {
            obj = obj[path[i]];
            
        } else {
            return alternativeValue
        }  
    };

    
    return obj;
};

module.exports = { deep_value }
/**
 * Created by zybn2004 on 14/11/14.
 */
Buffer.prototype._toString = Buffer.prototype.toString;
Buffer.prototype.toString = function(encoding,start,end){
    if((start===undefined||end===null)&&end===undefined||end===null){
        if(encoding===undefined||encoding===null){
            return this._toString();
        }else{
            return this._toString(encoding);
        }
    }else{
        if(start==undefined||start==null||isNaN(start)){
            start = 0;
        }
        if(end==undefined||end==null||isNaN(end)){
            end = this.length;
        }

        if(end<start){
            throw new RangeError('end < start');
        }

        var newBf = this.slice(start,end);
        if(encoding===undefined||encoding===null){
            return newBf._toString();
        }else{
            return newBf._toString(encoding);
        }
    }
}

Buffer.prototype.copy = function(targetBuffer, targetStart, sourceStart, sourceEnd){
    if(targetStart===undefined||targetStart===null||isNaN(targetStart)||targetStart<0){
        targetStart = 0;
    }
    if(sourceStart===undefined||sourceStart===null||isNaN(sourceStart)||sourceStart<0){
        sourceStart = 0;
    }
    if(sourceEnd===undefined||sourceEnd===null||isNaN(sourceEnd)){
        sourceEnd = this.length;
    }


    if(sourceEnd<sourceStart){
        throw new RangeError('sourceEnd < sourceStart');
    }


    var bfStart = targetBuffer.slice(0,targetStart);
    var bfEnd = targetBuffer.slice(targetStart+(sourceEnd-sourceStart));
    var newBfSource = this.slice(sourceStart,sourceEnd);
    var newBf = new Buffer();
    newBf.write(bfStart);
    newBf.write(newBfSource);
    newBf.write(bfEnd);
    targetBuffer.resize(0);
    targetBuffer.write(newBf);
}
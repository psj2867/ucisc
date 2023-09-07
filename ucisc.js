ucisc = (function (){
    const isIterable = o => o != null && typeof o[Symbol.iterator] === 'function'

    function codeRange(start,stop) {
      var result=[];
      for (var idx=start.charCodeAt(0),end=stop.charCodeAt(0); idx <=end; ++idx){
        result.push(String.fromCharCode(idx));
      }
      return result;
    };
    
    function codeRangeN(start,stop) {
      var result=[];
      for (var idx=start,end=stop; idx <=end; ++idx){
        result.push(String.fromCharCode(idx));
      }
      return result;
    };


    class RECOMMENDER{
      rl = [];
      constructor(u, rl){
        this.u = u;
        if(isIterable(rl)){
          this.rl.push(...rl);
          
        }
      }
      reset(){
        this.rl = [];
      }
      sort(){
        this.rl.sort();
      }
      addRecommendList(rl){
        this.rl.push(...rl);
        
      }
      addRecommendRange(a,b){
        this.rl.push(...codeRange(a,b));
        
      }
      addRecommendRangeN(a,b){
        this.rl.push(...codeRangeN(a,b));
        
      }
      _match(r, c){
        return r.charCodeAt(0) % this.u._opL() == this.u._op.indexOf(c);
      }
      recommend(c, n, s=0){
        var result = [];
        var count = 0;
        for (const r of this.rl) {    
          if( this._match(r,c) ){
            count++;
            if( s < count)
              result.push(r);
          }      
          if(result.length > n-1){
            return result;
          }
        }
        return result;
      }
    }


    class UCISC{
      _op = [];
      _except_list = [];

      addExceptPrintable(){
        this.addExcept(codeRangeN(0, 127));
      }
      addExceptWord(){
        this.addExcept(codeRange('0','9'));
        this.addExcept(codeRange('a','z'));
        this.addExcept(codeRange('A','Z'));
        this.addExcept(['_']);
      }
      addExceptBlank(){
        this.addExcept(['\u0009','\u000A']);
      }
      setOpList(op){
        this._op= op ;
      };

      setOpRange(a,b){
        this._op = codeRange(a,b);
      };

      _opL(){
        return this._op.length;
      }
      
      addExcept(el){
        this._except_list.push(...el);
      }
      _except(c){
        if( this._op.indexOf(c) != -1 )
          return true;
        if( this._except_list.indexOf(c) != -1)
          return true;
        return false;
      };
      _decode(c, u){
        var cp = c.charCodeAt(0);
        if(cp <= u._base_code)
          return c;
        if( u._except(c) )
          return c;
        return u._op[cp % u._op.length];
      };

      decode(src){
        return src.split('').map((c)=>this._decode(c,this)).join('');
      };

    }


    return {
        UCISC ,
        RECOMMENDER
    };
  }())
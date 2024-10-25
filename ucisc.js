;(function (w){
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


    class UciscRecommender{
      recommendList = [];
      constructor(ops){
        this.ops = ops;
      }
      reset(){
        this.recommendList = [];
      }
      sort(){
        this.recommendList.sort();
      }
      addRecommendList(rl){
        this.recommendList.push(...rl);
        
      }
      addRecommendRange(a,b){
        this.recommendList.push(...codeRange(a,b));
        
      }
      addRecommendRangeN(a,b){
        this.recommendList.push(...codeRangeN(a,b));
        
      }
      _match(c, r){
        return ( r.charCodeAt(0) % this.ops.length ) == this.ops.indexOf(c);
      }
      recommend(c, n, s=0){
        var result = [];
        var count = 0;
        for (const r of this.recommendList) {    
          if( this._match(c, r) ){
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


    class UciscDecoder{
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

    w.ucisc = {
        UciscDecoder ,
        UciscRecommender
    }
    return ;
}(window));

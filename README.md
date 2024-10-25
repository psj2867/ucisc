# uscis - Ultimate Complex Instruction Set Computer

가능한 많은 명령어를 가진 언어  
기본 개념은 Unicode를 기반으로 Unicode Codepoint를 목표 언어의 명령어 수로 나머지 연산을 통하여 명령어 번역하는 것입니다.  
현재, 목표 언어의 keywords는 한글자만 가능합니다. (Brain Fxx, Js Fxx 등)  

```
keywords = [...]
def convert(c):
    keywordsIndex = c.unicode_codepoint() % len(keywords)
    return keywords[keywordsIndex]   
```

demopage - [convertor - demo page](https://psj2867.github.io/demo_ucisc.html)



+++++++++++++++++++

a language with as many instructions as possible  
The basic concept is to translate Unicode Codepoint into keyword based on Unicode through the rest of the operations as the number of keywords in the target language.  
Currently, Keywords in the target language can only be one character. (Brain Fxx, Js Fxx, etc.)  

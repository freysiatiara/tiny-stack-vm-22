import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
const K=[0,17,65,4,6,10,11,15,,,,,,,,,9,9,9,9,9,9,9,5,9,9,9,5,9,9,9,,9,9,9,,,,,,,,,,,,,,32,36,36,32,0,,,,,,,,,,,,5,8,,,,,,,,,,,,,,,4,4,1,4];
function run(p,q){
const D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=[];
let s=0,c=0,pc=0,n=0,ip=0;
const T=e=>[o,e];
// traps: 0 halt, 2 underflow, 3 overflow, 4 div-by-zero, 5 bad opcode, 6 bad address, 7 call overflow, 8 ret empty, 9 pc out of range, 10 step limit, 11 output overflow
for(;;){
if(n===1e6)return T(10);
if(pc<0||pc>=p.length)return T(9);
const op=p[pc],k=K[op];
if(k===undefined)return T(5);
const im=k>>4,po=(k>>2)&3,pu=k&3;
if(pc+im>=p.length)return T(9);
n++;const nx=pc+1+im;
if(s<po)return T(2);
if(s-po+pu>256)return T(3);
pc=nx;
switch(op){
case 0:return T(0);
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const t=D[s-1];D[s-1]=D[s-2];D[s-2]=t;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const r=((p[nx-2]|p[nx-1]<<8)<<16)>>16;
let t=1;
if(op!=48){const v=D[--s];t=op==49?v==0:v!=0}
if(t)pc=nx+r;
break}
case 51:if(c==64)return T(7);C[c++]=nx;pc=p[nx-2]|p[nx-1]<<8;break;
case 52:if(!c)return T(8);pc=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>255)return T(6);D[s-1]=M[a];break}
case 65:{const a=D[s-1];if(a<0||a>255)return T(6);M[a]=D[s-2];s-=2;break}
case 80:{const g=String(D[--s]);if(o.length+g.length>65536)return T(11);for(const x of g)o.push(x.charCodeAt(0));break}
case 81:if(o.length>65535)return T(11);o.push(D[--s]&255);break;
case 82:D[s++]=ip<q.length?q[ip++]:-1;break;
case 83:return T(D[--s]&255);
default:{
const b=D[s-1],a=D[s-2];let r;
if(op==16)r=a+b|0;
else if(op==17)r=a-b|0;
else if(op==18)r=Math.imul(a,b);
else if(op==19){if(!b)return T(4);r=a==-2147483648&&b==-1?a:(a/b)|0}
else if(op==20){if(!b)return T(4);r=b==-1?0:a%b|0}
else if(op==21){if(!b)return T(4);r=Math.floor((a>>>0)/(b>>>0))|0}
else if(op==22){if(!b)return T(4);r=(a>>>0)%(b>>>0)|0}
else if(op==24)r=a&b;
else if(op==25)r=a|b;
else if(op==26)r=a^b;
else if(op==28)r=a<<(b&31);
else if(op==29)r=a>>(b&31);
else if(op==30)r=(a>>>(b&31))|0;
else if(op==32)r=a==b?1:0;
else if(op==33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
s-=2;D[s++]=r;
}
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const d of readdirSync(I).sort()){
const[o,e]=run(readFileSync(I+'/'+d+'/program.bin'),readFileSync(I+'/'+d+'/input.bin'));
mkdirSync(O+'/'+d,{recursive:true});
writeFileSync(O+'/'+d+'/stdout.bin',Uint8Array.from(o));
writeFileSync(O+'/'+d+'/exit.txt',e+'\n');
}

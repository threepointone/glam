(circa May 2017)

the biggest advantage of css-in-js systems, is that you can compose and create styling on the fly,
not just with access to a 'real' programming language, but also exposure to the runtime environment. 

there are 2 "costs" to doing it this way - 

- shipping css parse/generation logic to the browser (anywhere from 2k - 20k)  
- inlining css into your javascript (as strings and/or objects)

These costs are mitigated in a number of ways 

- prerendering css, optionally extracting it from html
- processing portions of the code during compile-time, avoiding sending infra
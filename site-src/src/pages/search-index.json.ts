import { loadGraph, routeFor, typeLabel } from '@/lib/graph';
export async function GET(){
  const graph=await loadGraph();
  const entries=[...graph.topicWorlds,...graph.topics,...graph.knowledge,...graph.videos,...graph.sources,...graph.learningPaths,...graph.projects,...graph.cooperations,...graph.magazines];
  const data=entries.map((entry)=>({uid:entry.data.uid,type:entry.data.type,typeLabel:typeLabel(entry.data.type),title:entry.data.title,summary:entry.data.summary??entry.data.dek??'',url:routeFor(entry),topics:entry.data.topicIds??[],worlds:entry.data.worldIds??[],status:entry.data.scientificStatus??'',text:`${entry.data.title} ${entry.data.summary??''} ${entry.data.dek??''}`}));
  return new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json; charset=utf-8'}});
}

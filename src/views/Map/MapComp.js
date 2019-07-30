import m from "mithril";
import { DataSet, Network } from "vis-network";
// import 'vis-network/dist/vis-network.css';

//model
import store from "../../data/store";

module.exports = {
  oninit: vnode => {
    vnode.state = {
      nodes: {},
      edges: {},
      data: {},
      network:{}
    };

    // create an array with nodes
    vnode.state.nodes = new DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" }
    ]);

    // create an array with edges
    vnode.state.edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 }
    ]);

    vnode.state.data = {
        nodes:vnode.state.nodes,
        edges:vnode.state.edges
    };
  },
  oncreate:vnode=>{
      const heightOfScreen = window.innerHeight+'px'
    vnode.state.network = new Network(vnode.dom, vnode.state.data, {height:heightOfScreen})
    console.dir(vnode.dom)
   
  },
  view: vnode => {
    return <div id="network" />;
  }
};

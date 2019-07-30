import m from "mithril";
import { DataSet, Network } from "vis-network";
// import 'vis-network/dist/vis-network.css';

//model
import store from "../../data/store";
import { ENETRESET } from "constants";

module.exports = {
  oninit: vnode => {
    vnode.state = {
      nodes: {},
      edges: {},
      data: {},
      network: {},
      keyboard:'',
      selectedNode:false
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
      nodes: vnode.state.nodes,
      edges: vnode.state.edges
    };
  },
  oncreate: vnode => {
    const heightOfScreen = window.innerHeight + "px";
    
    //create network
    vnode.state.network = new Network(vnode.dom, vnode.state.data, {
      height: heightOfScreen
    });

    //listen to keyboard
    document.addEventListener("keyup", keyEv => {
        let newLabel = "";
        const regexp = /[,.!@#$%^&*() a-z0-9\u0590-\u05fe]/gi;
        console.log(keyEv.key)
        if (keyEv.key === "Enter" || keyEv.key === "Tab"|| keyEv.key === "Shift") {
        } else if (keyEv.key === "Backspace"){
            console.log('back')
            vnode.state.keyboard = vnode.state.keyboard.substring(0, vnode.state.keyboard.length - 1);
            if(vnode.state.selectedNode !== false){
                vnode.state.nodes.update({id:vnode.state.selectedNode, label:vnode.state.keyboard})
              }
        } else if (regexp.test(keyEv.key)) {
            vnode.state.keyboard += keyEv.key;
          
          console.log(vnode.state.keyboard);
          if(vnode.state.selectedNode !== false){
            vnode.state.nodes.update({id:vnode.state.selectedNode, label:vnode.state.keyboard})
          }
          
        
        }
      });

    console.dir(vnode.state.network);
    vnode.state.network.on("click", ev => {});

    vnode.state.network.on("doubleClick", ev => {
      const isNewNode = ev.edges.length == 0 && ev.nodes.length == 0; 

      if (isNewNode) {
        const updatedIds = vnode.state.nodes.add([
          {
            label: "new",
            x: ev.pointer.canvas.x,
            y: ev.pointer.canvas.y
          }
        ]);
      }
    });

    vnode.state.network.on('selectNode', ev=>{
        vnode.state.selectedNode = ev.nodes[0];
    })

    
    vnode.state.network.on('deselectNode', ev=>{
        vnode.state.selectedNode = false;
        vnode.state.keyboard = '';
    })
  },
  view: vnode => {
    return <div id="network" />;
  }
};

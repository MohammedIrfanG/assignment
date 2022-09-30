const resource_uri = "http://localhost:4000/trucks"
const store = new Vuex.Store({
    state: {      
        trucks: [],
        message:''     
    },
    mutations:{
        setTrucks: (state,trucks) => state.trucks = trucks,
        newTrucks:  (state,trs) => {
            state.trucks.unshift(trs)
        },
        updateTruck: (state,updatedTrucks) => {            
            const editedTrack = state.trucks.findIndex(t => t.id === updatedTrucks.id)
            if(editedTrack !== -1){
                state.trucks.splice(editedTrack,1,updatedTrucks)
            }         
        },
        deleteTrucks:  (state,tr) => {
            debugger
            state.trucks=state.trucks.filter((t) => {
                return t.id !== tr.id
            })
            state.message=tr.msg;
        },
    },
    actions:{
        async fetchTrucks ({ commit }) {
            const respose = await axios.get(resource_uri);
            commit('setTrucks',respose.data);
        },
        async addTrucks ({ commit }, truck) {
            const respose = await axios.post(resource_uri, truck);
            commit('newTrucks',respose.data);
        },
        async updateTruck ({ commit }, truck) {            
            const respose = await axios.put(`${resource_uri}${truck.id}`, truck);
            commit('updateTruck',respose.data);
        },
        async removeTrucks ({ commit }, tr) {
            const respose = await axios.delete(`${resource_uri}${tr}`);
            commit('deleteTrucks',respose.data);
        }
    }
  });

new Vue({
    el: '#app',
    store:store,
    vuetify: new Vuetify(),
    data:{
        name:'',
        entryDate:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        edit:false,
        delete:false,
        cancel:false,
        id:'',
        ind:0,
        trucks:store.state.trucks,
        menu2: false,
        message:store.state.message
    },
    methods:{
        addTruck:function(t,d,e){
            e.preventDefault();
            truck = {
                name: this.name,
                entryDate: this.entryDate
            }           
            store.dispatch('addTrucks',truck);
            this.truck='';
            this.entryDate='';
        },
        editTruck:function(t,i){
            this.edit=!this.edit
            this.name=t.name;
            this.entryDate=t.entryDate;
            this.id=t.id;
            this.ind=i;
        },
        updateTruck:function(e){            
            e.preventDefault();
            this.edit=!this.edit
            let truckdb={
                name:this.name,
                entryDate:this.entryDate,
                id:this.id
            }
            store.dispatch('updateTruck',truckdb);
            this.name=''
            this.entryDate=''
        },
        cancelTruck:function(e){
            e.preventDefault(); 
            this.name=''
            this.entryDate=''
            this.edit=!this.editTruck;
        },
        deleteTruck:function(t,e){
            store.dispatch('removeTrucks',t.id).then(() =>{
                this.message=store.state.message;
                this.trucks= store.state.trucks;
            });
        },        
    },
    created:function(){
        store.dispatch('fetchTrucks').then(() => {
            debugger              
            this.trucks= store.state.trucks;        
        });        
    }
    
  });
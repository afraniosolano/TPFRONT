var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
	  pagina: 1,
	  vsearch: "",
		vurl: "http://127.0.0.1:8082/ptruora/v1.0/",
		is_down: true,
		logo: "",
		name: "",
		previus_ssl_grade: "",
		server_change: "",
		servers: "",
		ssl_grade: "",
		title: "",
		servers: [],
		historial: []
    },
	methods:{
		selpag1(){
			this.pagina = 1;
		},
		selpag2(){
			this.getHistorial();
			this.pagina = 2;
		},
		mostrarHistorial(data){
			this.historial= []
			if(data.items){
				for (i = 0; i < data.items.length; i++) {
					this.historial.push(data.items[i]);
				}
			}	
		},
		mostrarInfoDominio(data){
			if(data.name){
				this.is_down = data.is_down;
				this.logo = data.logo;
				this.name = data.name;
				this.previus_ssl_grade = data.previus_ssl_grade;
				this.server_change = data.server_change;
				this.ssl_grade = data.ssl_grade;
				this.title = data.title;
				this.servers = [];
				if(data.servers){
					for (i = 0; i < data.servers.length; i++) {
						vObj = data.servers[i];
						if(vObj.address){
							this.servers.push(vObj);
						}						
					}		
				}

			}else{
				this.name = "";
				alert("No se encontraron resultados para el dominio '" + this.vsearch + "'");
			}
		},
		errorMostrarInfoDominio(){
			alert("Error");
		},
		buscar(){
			url = this.vurl + "domain/" + this.vsearch;
			$.get( url, this.mostrarInfoDominio);	
		},getHistorial(){
			url = this.vurl + "tracert";
			$.get( url, this.mostrarHistorial);	
		}
	}
  });
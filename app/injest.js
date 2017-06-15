spec = require('./src/components/swagger.json');
Swagger = require('swagger-client');

var _api;
function API() {
	if(_api !== null) {
		return new Promise((resolve, reject) => {
			resolve(_api);
		})
	} else {
		return new Promise((resolve, reject) => {
			Swagger({ spec }).then(swagger => {
				_api = swagger.apis;
				resolve(_api)
			})
		})
	}
}

function genId() {return 0;}

let spots = [
	{id:genId(), lng: 151.21468936436338, lat: -33.85667594669833 },
	{id:genId(), lng: 151.21023865813532, lat: -33.855094719359485},
	{id:genId(), lng: 151.21774482209128, lat: -33.8519681430416},
	{id:genId(), lng: 151.20358974060105, lat: -33.84992948155219},
	{id:genId(), lng: 151.2232737923265, lat: -33.84579485048061},
	{id:genId(), lng: 151.1951994855155, lat: -33.86305317723418},
	{id:genId(), lng: 151.22200294190964, lat: -33.86113849852298},
	{id:genId(), lng: 151.2170247619879, lat: -33.86270648966041},
	{id:genId(), lng: 151.20912833864173, lat: -33.86142358996236},
	{id:genId(), lng: 151.20603843386277, lat: -33.85857263273653},
	{id:genId(), lng: 151.21032996827807, lat: -33.86249267438258},
	{id:genId(), lng: 151.20827003175867, lat: -33.86377555801812},
	{id:genId(), lng: 151.20406432800985, lat: -33.86520096167287},
	{id:genId(), lng: 151.2041501586981, lat: -33.86798043037041},
	{id:genId(), lng: 151.20792670900545, lat: -33.86847929978546},
	{id:genId(), lng: 151.2135057037454, lat: -33.87361035884434},
	{id:genId(), lng: 151.2151364868232, lat: -33.870546013447864},
	{id:genId(), lng: 151.2106732910313, lat: -33.86940576382178},
	{id:genId(), lng: 151.2272386138963, lat: -33.87118739716909}
]

let machineSpots = [{lat: -33.80126, lng:151.17115},
{lat: -33.80306, lng:151.09539},
{lat: -33.80306, lng:151.23609},
{lat: -33.80396, lng:151.23609},
{lat: -33.80486, lng:151.27181},
{lat: -33.80576, lng:151.25449},
{lat: -33.80755, lng:151.13436},
{lat: -33.80755, lng:151.22527},
{lat: -33.80845, lng:151.28805},
{lat: -33.81025, lng:151.08349},
{lat: -33.81025, lng:151.08457},
{lat: -33.81025, lng:151.08674},
{lat: -33.81205, lng:151.27291},
{lat: -33.81295, lng:151.12246},
{lat: -33.81295, lng:151.26100},
{lat: -33.81385, lng:151.23827},
{lat: -33.81385, lng:151.26101},
{lat: -33.81565, lng:151.26209},
{lat: -33.81655, lng:151.09107},
{lat: -33.81655, lng:151.14086},
{lat: -33.81655, lng:151.21122},
{lat: -33.81655, lng:151.26209},
{lat: -33.81745, lng:151.14627},
{lat: -33.81745, lng:151.21122},
{lat: -33.81835, lng:151.21447},
{lat: -33.81925, lng:151.23179},
{lat: -33.81925, lng:151.24153},
{lat: -33.82014, lng:151.22097},
{lat: -33.82104, lng:151.29025},
{lat: -33.82104, lng:151.29241},
{lat: -33.82284, lng:151.17009},
{lat: -33.82464, lng:151.15386},
{lat: -33.82644, lng:151.15494},
{lat: -33.82734, lng:151.18201},
{lat: -33.82734, lng:151.26320},
{lat: -33.82734, lng:151.26428},
{lat: -33.82824, lng:151.14953},
{lat: -33.82914, lng:151.18309},
{lat: -33.83094, lng:151.17768},
{lat: -33.83184, lng:151.18309},
{lat: -33.83274, lng:151.19067},
{lat: -33.83363, lng:151.18310},
{lat: -33.83453, lng:151.19068},
{lat: -33.83453, lng:151.28054},
{lat: -33.83543, lng:151.18526},
{lat: -33.83543, lng:151.28054},
{lat: -33.83633, lng:151.11597},
{lat: -33.83633, lng:151.28379},
{lat: -33.83723, lng:151.23399},
{lat: -33.83813, lng:151.28380},
{lat: -33.83993, lng:151.28488},
{lat: -33.84083, lng:151.16253},
{lat: -33.84083, lng:151.18094},
{lat: -33.84083, lng:151.23291},
{lat: -33.84083, lng:151.28597},
{lat: -33.84173, lng:151.28705},
{lat: -33.84263, lng:151.13438},
{lat: -33.84263, lng:151.18636},
{lat: -33.84263, lng:151.22750},
{lat: -33.84263, lng:151.28705},
{lat: -33.84353, lng:151.16037},
{lat: -33.84353, lng:151.19502},
{lat: -33.84353, lng:151.21776},
{lat: -33.84353, lng:151.22750},
{lat: -33.84353, lng:151.23400},
{lat: -33.84443, lng:151.28706},
{lat: -33.84533, lng:151.20152},
{lat: -33.84533, lng:151.28706},
{lat: -33.84622, lng:151.22426},
{lat: -33.84622, lng:151.28815},
{lat: -33.84712, lng:151.28815},
{lat: -33.84802, lng:151.17445},
{lat: -33.84892, lng:151.24592},
{lat: -33.84982, lng:151.24484},
{lat: -33.84982, lng:151.28924},
{lat: -33.85072, lng:151.24484},
{lat: -33.85072, lng:151.28924},
{lat: -33.85162, lng:151.26542},
{lat: -33.85162, lng:151.28816},
{lat: -33.85162, lng:151.28924},
{lat: -33.85252, lng:151.24593},
{lat: -33.85342, lng:151.28816},
{lat: -33.85432, lng:151.28817},
{lat: -33.85522, lng:151.28817},
{lat: -33.85612, lng:151.20912},
{lat: -33.85702, lng:151.21020},
{lat: -33.85792, lng:151.20804},
{lat: -33.85792, lng:151.21453},
{lat: -33.85882, lng:151.21453},
{lat: -33.85971, lng:151.28710},
{lat: -33.86151, lng:151.20263},
{lat: -33.86151, lng:151.22212},
{lat: -33.86241, lng:151.20263},
{lat: -33.86241, lng:151.20479},
{lat: -33.86421, lng:151.28494},
{lat: -33.86511, lng:151.19180},
{lat: -33.86601, lng:151.25029},
{lat: -33.86691, lng:151.25029},
{lat: -33.86781, lng:151.19289},
{lat: -33.86781, lng:151.25029},
{lat: -33.86871, lng:151.18097},
{lat: -33.86871, lng:151.25029},
{lat: -33.86871, lng:151.28604},
{lat: -33.86961, lng:151.18856},
{lat: -33.86961, lng:151.25138},
{lat: -33.87051, lng:151.22538},
{lat: -33.87051, lng:151.23730},
{lat: -33.87141, lng:151.22322},
{lat: -33.87320, lng:151.11599},
{lat: -33.87320, lng:151.28605},
{lat: -33.87410, lng:151.22864},
{lat: -33.87410, lng:151.23622},
{lat: -33.87410, lng:151.28605},
{lat: -33.87500, lng:151.11599},
{lat: -33.87500, lng:151.28605},
{lat: -33.87950, lng:151.28498},
{lat: -33.88040, lng:151.28498},
{lat: -33.88130, lng:151.28498},
{lat: -33.88310, lng:151.28607},
{lat: -33.88400, lng:151.23732},
{lat: -33.88400, lng:151.28607},
{lat: -33.88490, lng:151.17991},
{lat: -33.88579, lng:151.28716},
{lat: -33.88669, lng:151.28716},
{lat: -33.88759, lng:151.28717},
{lat: -33.88939, lng:151.28717},
{lat: -33.89029, lng:151.28717},
{lat: -33.89119, lng:151.28717},
{lat: -33.89839, lng:151.12467},
{lat: -33.89839, lng:151.26877},
{lat: -33.89928, lng:151.27744},
{lat: -33.90288, lng:151.26662},
{lat: -33.90648, lng:151.27096},
{lat: -33.90738, lng:151.27204},
{lat: -33.91098, lng:151.27205},
{lat: -33.91188, lng:151.27205},
{lat: -33.91367, lng:151.27314},
{lat: -33.91457, lng:151.25255},
{lat: -33.91817, lng:151.26448},
{lat: -33.92537, lng:151.14528},
{lat: -33.92537, lng:151.14636},
{lat: -33.92986, lng:151.13553},
{lat: -33.93256, lng:151.14095},
{lat: -33.93616, lng:151.12578},
{lat: -33.94155, lng:151.26670},
{lat: -33.95324, lng:151.09109},
{lat: -33.95414, lng:151.09109},
{lat: -33.95954, lng:151.26783},
{lat: -33.96044, lng:151.26241},
{lat: -33.96224, lng:151.25374},
{lat: -33.96224, lng:151.25482},
{lat: -33.96314, lng:151.13338},
{lat: -33.96583, lng:151.25266},
{lat: -33.96763, lng:151.25375},
{lat: -33.97033, lng:151.13447},
{lat: -33.97123, lng:151.13230},
{lat: -33.97213, lng:151.12797},
{lat: -33.97213, lng:151.12905},
{lat: -33.97213, lng:151.13013},
{lat: -33.97393, lng:151.22448},
{lat: -33.97483, lng:151.24943},
{lat: -33.97932, lng:151.12038},
{lat: -33.97932, lng:151.12146},
{lat: -33.97932, lng:151.12255},
{lat: -33.98022, lng:151.24835}];



Swagger({ spec }).then(swagger => {
	api = swagger.apis;

	function loadManualSpots() {
		return spots.forEach((spot, i) => {
			api.spots.create({ data: 
			{
				name: 'Chill Ridge',
				suburb: 'Over The Rainbow',
				tags: ['manual-basic-spots-1'],
				lng: Math.round(spot.lng*1000000000)/1000000000,
				lat: Math.round(spot.lat*1000000000)/1000000000
			}}).then(yay => console.log(yay)).catch(wtf => console.error(wtf))
		})
	}
	
	function loadMachineSpots() {
		return machineSpots.forEach((spot, i) => {
			api.spots.create({ data: 
			{
				name: 'Uncanny Valley',
				suburb: 'CPU',
				tags: ['machine-learning-1'],
				lng: Math.round(spot.lng*1000000000)/1000000000,
				lat: Math.round(spot.lat*1000000000)/1000000000
			}}).then(yay => console.log(yay)).catch(wtf => console.error(wtf))
		})
	}

	// manualSpots();
	loadMachineSpots();
	

}).catch(wtf => console.error(wtf))
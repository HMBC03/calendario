export const DEFAULT_SUBJECTS = [
  {id:'mat', name:'Matemáticas Básicas', credits:4, syncHours:4, color:'#1D5E4F'},
  {id:'cc',  name:'Introducción a las Ciencias de la Computación y Programación', credits:3, syncHours:4, color:'#2A4C8A'},
  {id:'cat', name:'Cátedra Nacional de Inducción', credits:2, syncHours:2, color:'#A8541F'}
];

export const DEFAULT_ACTS = {
  'mat-s':{label:'Sincrónica Matemáticas Básicas', subject:'mat', kind:'S'},
  'mat-a':{label:'Asincrónica Matemáticas Básicas', subject:'mat', kind:'A'},
  'cc-s' :{label:'Sincrónica Intro CC y Programación', subject:'cc', kind:'S'},
  'cc-a' :{label:'Asincrónica Intro CC y Programación', subject:'cc', kind:'A'},
  'cat-s':{label:'Sincrónica Cátedra de Inducción', subject:'cat', kind:'S'},
  'cat-a':{label:'Asincrónica Cátedra de Inducción', subject:'cat', kind:'A'},
  'ing'  :{label:'Inglés — autónomo', color:'#6B4A8F', kind:'A'},
  'bien' :{label:'Bienestar y actividad física', color:'#0F7B8A', kind:'X'},
  'esen' :{label:'Alimentación, ruta y descanso', color:'#8D958F', kind:'X'},
  'trab' :{label:'Trabajo remunerado', color:'#8E2F45', kind:'X'}
};

export const SEED = {
  0:{6:'esen',7:'esen',8:'mat-a',9:'mat-a',10:'cc-a',11:'cc-a',12:'esen',13:'cat-a',14:'mat-a',15:'esen',16:'cat-s',17:'cat-s',18:'esen',19:'ing',20:'bien',21:'esen'},
  1:{6:'esen',7:'mat-s',8:'mat-s',9:'cc-s',10:'cc-s',11:'cc-a',12:'esen',13:'mat-a',14:'mat-a',15:'esen',16:'mat-a',17:'mat-a',18:'esen',19:'ing',20:'bien',21:'esen'},
  2:{6:'esen',7:'esen',8:'esen',9:'cc-a',10:'cc-a',11:'cc-a',12:'esen',13:'cc-a',14:'cc-a',15:'esen',16:'bien',17:'mat-a',18:'esen',19:'ing',20:'cat-a',21:'esen'},
  3:{6:'esen',7:'mat-s',8:'mat-s',9:'cc-s',10:'cc-s',11:'mat-a',12:'esen',13:'cc-a',14:'cc-a',15:'cat-a',16:'bien',17:'bien',18:'esen',19:'ing',20:'bien',21:'esen'},
  4:{6:'esen',7:'esen',8:'cc-a',9:'cc-a',10:'mat-a',11:'mat-a',12:'esen',13:'bien',14:'cat-a',15:'cat-a',16:'mat-s',17:'mat-s',18:'esen',19:'trab',20:'trab',21:'trab'},
  5:{6:'esen',7:'esen',8:'trab',9:'trab',10:'trab',11:'trab',12:'esen',13:'trab',14:'trab',15:'trab',16:'trab',17:'esen',18:'esen',19:'bien',20:'ing',21:'esen'},
  6:{6:'esen',7:'esen',8:'bien',9:'mat-a',10:'mat-a',11:'esen',12:'esen',13:'bien',14:'cc-a',15:'bien',16:'bien',17:'bien',18:'esen',19:'esen',20:'esen',21:'esen'}
};

export const CUSTOM_SEED = {
  '0_6':'Despertar y prepararse','0_7':'Desayuno y desplazamiento','0_12':'Almuerzo (apoyo alimentario)','0_15':'Descanso','0_18':'Cena','0_20':'Tiempo personal','0_21':'Descanso',
  '1_6':'Despertar y prepararse','1_12':'Almuerzo (apoyo alimentario)','1_15':'Descanso','1_18':'Cena','1_20':'Tiempo personal','1_21':'Descanso',
  '2_6':'Despertar y prepararse','2_7':'Ruta Simón — desplazamiento','2_8':'Desayuno y llegada','2_9':'Code Abbey — Programación','2_13':'Proyecto CC','2_12':'Almuerzo (apoyo alimentario)','2_15':'Descanso','2_16':'Actividad física','2_17':'GEA / monitoría de Matemáticas','2_18':'Cena','2_21':'Descanso',
  '3_6':'Despertar y prepararse','3_11':'Repaso de clase de Matemáticas','3_12':'Almuerzo (apoyo alimentario)','3_13':'Taller de Programación','3_16':'Actividad física','3_17':'Tiempo personal','3_18':'Cena','3_20':'Tiempo personal','3_21':'Descanso',
  '4_6':'Despertar y prepararse','4_7':'Ruta Simón — desplazamiento','4_10':'Taller de práctica','4_12':'Almuerzo (apoyo alimentario)','4_13':'Trámites de Bienestar / SAE','4_16':'Matemáticas Básicas — Aula TIC','4_18':'Cena','4_19':'Trabajo nocturno',
  '5_6':'Despertar y prepararse','5_7':'Descanso','5_8':'Trabajo de fin de semana','5_12':'Almuerzo','5_13':'Trabajo de fin de semana','5_17':'Descanso','5_18':'Cena','5_19':'Tiempo personal','5_21':'Descanso',
  '6_6':'Despertar y prepararse','6_7':'Descanso','6_8':'Tiempo personal y familia','6_11':'Revisión de entregas de la semana','6_12':'Almuerzo','6_13':'Planeación y seguimiento semanal','6_15':'Tiempo personal y familia','6_16':'Descanso y deporte','6_17':'Tiempo personal','6_18':'Preparar materiales','6_19':'Descanso','6_20':'Descanso','6_21':'Descanso'
};

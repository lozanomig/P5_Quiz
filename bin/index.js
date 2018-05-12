const Sequelize = require ('sequelize');
const sequelize = new Sequelize("sqlite:quizzes.sqlite", {logging: false});

sequelize.define('quiz', {
	question: {
		type: Sequelize.STRING,
		unique: {msg:"Pregunta ya guardada"},
		validate:{notEmpty:{msg:"La pregunta no puede estar vacia"}}
	},
	answer: {
		type: Sequelize.STRING,
		validate:{notEmpty:{msg:"La respuesta no puede estar vacia"}}
	}
});

sequelize.sync()
.then(() => sequelize.models.quiz.count())
.then(count => {
	if (!count){
		return sequelize.models.quiz.bulkCreate([
			{
    		question: "¿Capital de Alemania?",
    		answer: "Berlin"
 			},
    		{
    		question: "¿Capital de Portugal?",
    		answer: "Lisboa"
   			},
    		{
    		question: "¿Capital de Argentina?",
    		answer: "Buenos Aires"
    		},
   			{
    		question: "¿Capital de Uruguay?",
    		answer: "Montevideo"
    		},
    		]);
	}
})
.catch(error => {
	console.log(error);
});
module.exports = sequelize;
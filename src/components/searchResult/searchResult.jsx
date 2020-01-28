
import React from "react";

import "./searchResult.scss";

import ImageLabor from "../image/image";
import {numToStr} from "../../utils/uti";


/*
	Componente searchResultLabor.
	Props:
		
		img: STRING - Ruta o URL de la imagen.
		title: STRING - Título de la oferta.
		companyName: STRING - Nombre de la empresa.
		description: STRING - Descripción de la oferta.
		city: STRING - Ciudad.
		date: STRING - Fecha de publicación.
		contractType: STRING - Tipo de contrato.
		minHoursWeek: NUMBER - Horas mínimas a la semana.
		maxHoursWeek (opc): NUMBER - Horas máximas a la semana.
		minSalary: NUMBER - Salario anual mínimo.
		maxSalary (opc): NUMBER - Salario anual máximo.
	
	Ejemplo:
		
		<SearchResultLabor
			img={"https://about.canva.com/wp-content/uploads/sites/3/2016/08/logos-1.png"}
			title="Full stack developer (MERN stack)"
			companyName="Nombre de empresa 02"
			description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint repellat aut dolore voluptatibus magni impedit animi? Assumenda sit nesciunt et, modi, delectus facilis unde dicta quidem incidunt nam accusantium odio?"
			city="Valencia"
			date="21 ene"
			contractType="Fulltime"
			minHoursWeek={20}
			maxHoursWeek={25}
			minSalary={15000}
			maxSalary={16000}
		/>
	.
*/


export default class searchResultLabor extends React.Component {
	
	constructor (props) {
		super(props);
		
		
		this.state = {
			
		};
		
	};
	
	render() {
		
		let hoursWeek;
		
		if (this.props.maxHoursWeek) { // si han definido horas máximas
			hoursWeek = `${this.props.minHoursWeek} - ${this.props.maxHoursWeek} h/semana`;
		} else { // sólo hay mínimo de horas
			hoursWeek = `Mín. ${this.props.minHoursWeek} h/semana`;
		};
		
		
		let salary;
		
		if (this.props.maxSalary) { // si han definido salario máximos
			salary = `${ numToStr(this.props.minSalary) } - ${ numToStr(this.props.maxSalary) } bruto €/año`;
		} else { // sólo hay mínimo
			salary = `Mín. ${ numToStr(this.props.minSalary) } bruto €/año`;
		};
		
		
		
		return(
			
			<div className="resultCard br pt3 pb3 pr3 flex-dir-r mb2">
				
				<div className="col1 flex-dir-c">
					
					<div className="image">
						<ImageLabor
							className="br"
							src={ this.props.img ? this.props.img : "/img/companyLogoPlaceholder.png" }
							w={100}
							alt="imagen de la empresa"
							measure="px"
							br={15}
						/>
					</div>
				</div>
				
				<div className="col2 flex-dir-c">
					
					<h2 className="title">{ this.props.title }</h2>
					<h2 className="companyName pb1">{ this.props.companyName }</h2>
					
					<div className="row1 flex-dir-r pb2">
						<div className="offerInfo pt2 pb2">
							{ this.props.city }  |  { this.props.date }
						</div>
					</div>
					
					<p className="description">{ this.props.description }</p>
					
					<div className="row2 pt3 flex-dir-r">
						<div className="offerInfo pt2 pb2">
							{ this.props.contractType } | {hoursWeek} | {salary}
						</div>
					</div>
					
					
				</div>
				
			</div>
			
		);
	};
	
	
};

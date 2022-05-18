import React, { Component } from 'react';
import * as contentful from 'contentful'
import App from './App'

const client = contentful.createClient ({
	space: process.env.REACT_APP_SPACE_ID,
	accessToken: process.env.REACT_APP_ACCESS_TOKEN
})


const getContentType = async (type) => {

	let content;
	await client.getEntries({
		content_type: type,
		select: "fields"
	})
		.then  ((response) => content = response.items)
		.catch ((error)    => console.log(error));
	return (content);
};

const mergeProjects = (homepageProjects, additionalProjects) => {

	let i = -1;
	let j = -1;
	let current_id = 1;
	let tmp;
	let allProjects = [];

	while (++i < homepageProjects.length)
	{
		tmp = current_id;
		j = 0;
		while (j < homepageProjects.length)
		{
			if (homepageProjects[j].fields.id === current_id)
			{
				homepageProjects[j].fields.id -= 1;
				allProjects.push(homepageProjects[j]);
				current_id++;
			}
			j++;
		}
		if (tmp === current_id) // if id not found, skip
			current_id++;
	}
	for (let i = 0; i < additionalProjects.length; i++)
	{
		additionalProjects[i].fields.id = i + homepageProjects.length;
		allProjects.push(additionalProjects[i]);
	}
	return (allProjects);
};

const getContent = async (contentName) => {

	let t;
	let tmp;
	let t_arr = [];

	let home  = {};
	let items = {};




	let allProjects = [];

	await getContentType("home").then ( (content) => tmp = content)

	t = tmp[0].fields.backgroundImagevideoDirectLink;
	home.background_media_url = t;
	home.background_media_description = "Eureka factory background video presentation";
	if (typeof t === "undefined")
	{
		t = tmp[0].fields.backgroundImagevideo.fields;
		home.background_media_url = t.file.url;
		home.background_media_description = t.description;
	}

	t = tmp[0].fields.collections;
	for (let i = 0; i < t.length ; i++)
	{
		t_arr.push(
			{
				name: t[i].fields.collectionName,
				fr : t[i].fields.collectionDescriptionFrench.content,
				en : t[i].fields.collectionDescriptionEnglish.content
			}
		)
	}
	home.collections = t_arr;

	for (let i = 0; i < home.collections.length; i++)
	{
		t_arr = [];
		for (let j = 0; j < home.collections[i].fr.length; j++)
			t_arr.push(home.collections[i].fr[j].content[0].value);
		home.collections[i].fr = t_arr;
		t_arr = [];
		for (let j = 0; j < home.collections[i].en.length; j++)
			t_arr.push(home.collections[i].en[j].content[0].value);
		home.collections[i].en = t_arr;
		home.collections[i].images = [];
	}


	await getContentType("item").then ( (content) => tmp = content)
	for (let currentCollection = 0; currentCollection < home.collections.length; currentCollection++ )
		for (let currentImage = 0; currentImage < tmp.length; currentImage++)
			if (home.collections[currentCollection].name === tmp[currentImage].fields.itemCollection)
				home.collections[currentCollection].images.push(tmp[currentImage].fields)


	//for (let i = 0; i < home.collections.length; i++)
	//{
	//for (let j = 0; j < home.items.length; j++)




	//await getContentType("project").then            ( (content) => homepageProjects   = content)
	//await getContentType("additionalProjects").then ( (content) => additionalProjects = content)
	//await getContentType("homepageText").then       ( (content) => homepageText       = content)

	//allProjects = mergeProjects(homepageProjects, additionalProjects);
	//console.log(allProjects)

	// Normalizing ids if random numbers in homepageProjects
	//for (let i = 0; i < allProjects.length; i++)
	//allProjects[i].fields.id = i;

	return ({
		home :home
	});
};

class DBLoader extends Component
{
	state = { db : {} };

	componentDidMount() {
		getContent().then((res) => {
			this.setState({db : res})
		})
	}

	render ()
	{
		let items = 0;
		const {db} = this.state;
		for (let objects in db)
			items++;
		if (items)
			return (<App db={this.state.db}/>)
		else
			return (<div className="flex fixed h100 w100 poster textGreen bgBeige center">LOADING...</div>)
	}
}

export default DBLoader

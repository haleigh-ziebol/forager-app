import React from 'react';

//MUI components
import { Card } from '@mui/material';

const techArray = ['React.js', 'Saga.js', 'Redux.js', 'Express.js', 'Node.js', 'Axios', 'Postgres', 'SQL', 'HTML5', 'CSS', 'GitHub', 'Wikipedia API', 'Google Maps API', 'Amazon Web Services']

function AboutPage() {
  return (
    <div className="container center" style={{lineHeight:"150%"}}>
      <Card sx={{ maxWidth: 4/5, p:'2rem', bgcolor:'#FFF4F4', color:'#484E6B'}} className='background1 boxshadow'>
        <div className="box-item3">
        <img src="https://www.svgrepo.com/show/190938/apple-vegan.svg"
          height="30px"
          />
        <h3>Purpose:</h3>
        </div>
        <p>
          Foragers have special spots they visit every year and are always looking for new wild edibles! 
          On this app users input information <span>&#8212;</span>including the location and species along with a photo and notes<span>&#8212;</span> about their foraging spot. 
          This data is stored on a map where they can view, edit and delete finds. 
          When they input a new species, it counts toward foraging badges that a user can earn.
          Users can also search for species by region/name/growth type in the database and learn more about them!
        </p>
        <div className="box-item3">
        <img src="https://www.svgrepo.com/show/190942/tea.svg"
          height="30px"
          />
        <h3>Technologies Used:</h3>
        </div>
        <ul>
          {techArray.map((tech, i) => {
            return <li key={i}>{tech}</li>
          })}
        </ul>
        <div className='box-item3'>
        <img src="https://www.svgrepo.com/show/190963/open-book-books.svg"
          height="30px"
          />
          <h3>Data:</h3>
        </div>
        <p>Species data scraped from the USDA <a href="https://plants.sc.egov.usda.gov/home">PLANTS Database</a> and 
        the Lady Bird Johnson Wildflower Center of UTexas's <a href="https://www.wildflower.org/plants-main">Native Plants of North America Database</a> using <a href="https://www.octoparse.com/">Octoparse</a>.</p>
      
        <br/>
        <p>©Haleigh Ziebol 2023</p>
      </Card>
    </div>
  );
}

export default AboutPage;

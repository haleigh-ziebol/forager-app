import React from 'react';

//MUI components
import { Card } from '@mui/material';

const techArray = ['React.js', 'Saga.js', 'Redux.js', 'Express.js', 'Node.js', 'Axios', 'Postgres', 'SQL', 'HTML5', 'CSS', 'GitHub', 'Wikipedia API', 'Google Maps API', 'Amazon Web Services (AWS)']

function AboutPage() {
  return (
    <div className="container center">
      <Card sx={{ maxWidth: 3/4, p:'2rem'}}>
        <h3>Purpose:</h3>
        <p>
          Foragers have special spots they visit every year and are always looking for new wild edibles! 
          On this app users input the location and species along with photos and notes for their foraging spot. 
          This data is stored on a map where they can view, edit and delete finds. 
          When they input a new species, it counts toward foraging badges that a user can earn.
          Users search for species by region/name/growth type in the database and learn more about them!
        </p>
        <h3>Technologies Used:</h3>
        <ul>
          {techArray.map((tech, i) => {
            return <li key={i}>{tech}</li>
          })}
        </ul>
        <h3>Data:</h3>
        <p>Species data scraped from the USDA <a href="https://plants.sc.egov.usda.gov/home">PLANTS Database</a> and 
        the Lady Bird Johnson Wildflower Center of UTexas's <a href="https://www.wildflower.org/plants-main">Native Plants of North America Database</a> using <a href="https://www.octoparse.com/">Octoparse</a>.</p>
      
        <br/>
        <p>©Haleigh Ziebol 2023</p>
      </Card>
    </div>
  );
}

export default AboutPage;

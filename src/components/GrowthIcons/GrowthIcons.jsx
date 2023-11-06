function GrowthIcons( {growth_type}) {

  return (
    <div>
      {growth_type.substring(0,6).includes('Tree') &&
        <img 
          id="tree"
          alt="tree"
          width={"35px"}
          height={"35px"}
          src={`Site_SVG/types/Tree.svg`}
          title="tree"
        /> 
      }

      {growth_type.substring(0,6).includes('Shrub') &&
        <img 
          id="shrub"
          alt="shrub"
          width={"35px"}
          height={"35px"}
          src={`Site_SVG/types/Shrub.svg`}
          title="shrub"
        /> 
      }

      {growth_type.substring(0,6).includes('Forb') &&
        <img 
          id="forb"
          alt="forb"
          width={"35px"}
          height={"35px"}
          src={`Site_SVG/types/Forb.svg`}
          title="forb"
        /> 
      }
      {growth_type.substring(0,6).includes('Vine') &&
        <img 
          id="vine"
          alt="vine"
          width={"35px"}
          height={"35px"}
          src={`Site_SVG/types/Vine.svg`}
          title="vine"
        /> 
      }
    </div>
  );
}

export default GrowthIcons;

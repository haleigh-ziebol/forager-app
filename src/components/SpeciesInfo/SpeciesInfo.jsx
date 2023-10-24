import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import wtf from 'wtf_wikipedia';

function SpeciesInfo() {

    const dispatch = useDispatch();
    const params = useParams()

    const speciesInfo = useSelector(store => store.wikipedia.wikiSpeciesData)
    console.log(speciesInfo)

    // const [prop] = Object.keys(image)
    // console.log (prop)
    //wikipedia API call for text and image
        //need scientific name, but snip after var
    //process text with wtf_wiki
    //display image

    // on load, dispatch the saga action
    useEffect(() => {
      console.log('in useEffect');
      const action = { type: 'GET_SPECIES', payload: 1 };
      dispatch(action);
    }, []);

    return(
        <div>
            
            {JSON.stringify(wtf("{{Short description|Maple tree native in North America}}\n{{Good article}}\n{{Speciesbox\n| name = Red maple\n| image = 2014-10-30 11 09 40 Red Maple during autumn on Lower Ferry Road in Ewing, New Jersey.JPG\n| status = LC\n| status_system = IUCN3.1\n| status_ref = <ref name=IUCN>{{cite iucn |author1=Crowley, D. |author2=Barstow, M. |year=2017 |title=''Acer rubrum'' |page=e.T193860A2287111 |doi=10.2305/IUCN.UK.2017-3.RLTS.T193860A2287111.en |access-date=7 October 2022}}</ref>\n| status2 = G5\n| status2_system = TNC\n| status2_ref = <ref name=natureserve>{{Cite web | publisher = NatureServe|author=NatureServe| title = ''Acer rubrum'' |website=NatureServe Network Biodiversity Location Data accessed through NatureServe Explorer| location = Arlington, Virginia |date=2 June 2023 | url =https://explorer.natureserve.org/Taxon/ELEMENT_GLOBAL.2.159330/Acer_rubrum|access-date=6 June 2023}}</ref>\n| genus = Acer\n| parent = Acer sect. Rubra\n| species =  rubrum\n| authority = [[Carl Linnaeus|L.]]\n| range_map = Acer rubrum range map.png\n| synonyms_ref = <ref>{{ThePlantList |id=kew-2616329 |taxon=Acer rubrum |authority=L.}}</ref>\n| synonyms = {{collapsible list|bullets = true\n|''Acer carolinianum'' <small>Walter</small>\n|''Acer coccineum'' <small>F.Michx.</small>\n|''Acer drummondii'' <small>Hook. & Arn. ex Nutt.</small>\n|''Acer fulgens'' <small>Dippel</small>\n|''Acer glaucum'' <small>Marshall</small>\n|''Acer glaucum'' <small>K.Koch</small>\n|''Acer hypoleucum'' <small>K.Koch 1869 not Hayata 1913</small>\n|''Acer microphyllum'' <small>Pax 1886 not Opiz 1824</small>\n|''Acer sanguineum'' <small>Spach</small>\n|''Acer semiorbiculatum'' <small>Pax</small>\n|''Acer splendens'' <small>Dippel</small>\n|''Acer wagneri'' <small>Wesm.</small>\n|''Rufacer carolinianum'' <small>(Walter) Small</small>\n|''Rufacer drummondii'' <small>(Hook. & Arn. ex Nutt.) Small</small>\n|''Rufacer rubrum'' <small>(L.) Small</small>\n}}\n}}\n'''''Acer rubrum''''', the '''red maple''', also known as '''swamp maple''', '''water maple''', or '''soft maple''', is one of the most common and widespread deciduous [[tree]]s of eastern and central North America. The [[U.S. Forest Service]] recognizes it as the most abundant native tree in eastern North America.<ref>{{cite web|last=Nix|first=Steve|title=Ten Most Common Trees in the United States|url=http://forestry.about.com/b/2012/07/21/ten-most-common-trees-in-the-united-states.htm|publisher=About.com Forestry|access-date=8 October 2016|archive-date=19 June 2016|archive-url=https://web.archive.org/web/20160619084451/http://forestry.about.com/b/2012/07/21/ten-most-common-trees-in-the-united-states.htm|url-status=dead}}</ref> The red maple ranges from southeastern [[Manitoba]] around the [[Lake of the Woods]] on the border with [[Ontario]] and [[Minnesota]], east to [[Newfoundland and Labrador|Newfoundland]], south to [[Florida]], and southwest to [[East Texas]]. Many of its features, especially its leaves, are quite variable in form. At maturity, it often attains a height around {{convert|30|m|ft|-1|abbr=on}}. Its flowers, petioles, twigs, and seeds are all red to varying degrees. Among these features, however, it is best known for its brilliant deep scarlet foliage in autumn.\n\nOver most of its range, red maple is adaptable to a very wide range of site conditions, perhaps more so than any other tree in eastern North America. It can be found growing in [[swamp]]s, on poor, dry [[soil]]s, and almost anywhere in between. It grows well from [[sea level]] to about {{convert|900|m|ft|abbr=on}}. Due to its attractive fall foliage and pleasing form, it is often used as a shade tree for landscapes. It is used commercially on a small scale for [[maple syrup]] production and for its medium to high quality lumber. It is also the [[List of U.S. state and territory trees|state tree]] of Rhode Island. The red maple can be considered weedy or even invasive in young, highly disturbed forests, especially frequently logged forests. In a mature or old-growth northern hardwood forest, red maple only has a sparse presence, while shade-tolerant trees such as sugar maples, [[beech]]es, and [[Tsuga canadensis|hemlocks]] thrive. By removing red maple from a young forest recovering from disturbance, the natural cycle of forest regeneration is altered, changing the diversity of the forest for centuries to come.<ref>{{cite news | title=Eastern Forests Change Color As Red Maples Proliferate | url=https://www.nytimes.com/1999/04/27/science/eastern-forests-change-color-as-red-maples-proliferate.html | newspaper=New York Times | date=27 April 1999 | access-date=30 March 2015 | last=Stevens | first=William K. }}</ref>").text())}
        </div>
    )
}

export default SpeciesInfo;
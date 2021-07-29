
//  const server = "Dev";   
// const server = "Stag" 
const server = "Prod";   

export default function subUrls () {           

const staging = "mobileappnew";  
const common = "mobileapp";
let returnData ; 

if(server == "Dev"){    

    returnData = common; 
} 

else if(server == "Stag"){   

    returnData = staging;
}

else{ 

    returnData =  common;
}

return returnData ;

}


export const mainUrls =()=> {           

    const staging = {
         BASE_URL : "http://trove-drupal.itp.com/",
        ITP_URL : "http://trove.itp.com/",
        COMMENTS_URL : "https://firestore.googleapis.com/",
        PAYWALL_URL : "https://paywall.itp.com/",
    };  

    const dev = {
        BASE_URL : "http://trove-drupal.itp.com/",
        ITP_URL : "http://trove.itp.com/",
        COMMENTS_URL : "https://firestore.googleapis.com/",
        PAYWALL_URL : "https://paywalldemo.itp.com/",

   };
    let returnData ; 
    
    if(server == "Dev"){    
        returnData = dev; 
    } 
    
    else if(server == "Stag"){      
        returnData = staging;
    }
    
    else{ 
        returnData =  staging; 
    }
    
    return returnData ;
    
    }


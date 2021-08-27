const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');

// console.log("Hello");
const getInformation = async(event) =>{
    event.preventDefault();
    // alert("HEllo");
    let cityVal = cityName.value;

    if(cityVal === ""){
        // console.log(city_name.innerText);
        city_name.innerText = `This field cannot be left empty`;
        // city_name.style.backgroundColor = "red";
        datahide.classList.add('data_hide');
    }
    else{
        try{
        let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=2b333df5fa8e4f5b3efd9ad0da855b41`;
        const response = await fetch(url);
        const data = await response.json();

        const arrData = [data];
        city_name.innerText = `${arrData[0].name},${arrData[0].sys.country}`;
        temp_real_val.innerText = arrData[0].main.temp;
        const tempMood = arrData[0].weather[0].main;

        console.log(tempMood);

        if(tempMood =="Clear"){
            temp_status.innerHTML = "<i class='fas fa-sun' style='color:'#ffdf00;'></i>";
        }else if(tempMood=="Clouds"){
            temp_status.innerHTML ="<i class='fa fa-cloud' style='color :#f1f2f6;'></i>";
        }else if(tempMood=="Rain"){
            temp_status.innerHTML ="<i class='fa fa-cloud-rain' style='color:#a4b0be;'></i>";
        }
        else{
            temp_status.innerHTML ="<i class='fa fa-sun' style='color:#ffdf00'></i>";
        }

        datahide.classList.remove('data_hide');
        cityVal="";
    }
        catch{
            cityVal="";
            datahide.classList.add('data_hide');
            city_name.innerText = `Enter proper city name`;
            console.log("Enter proper city name");
        }
        
    }
}
submitBtn.addEventListener('click', getInformation);
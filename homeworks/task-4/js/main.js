"use strict";


function getUsers() {

    document.body.classList.toggle('_loading');


    fetch('https://randomuser.me/api/?results=10')
    .then(
        function (res) {
            return res.json();
        }
    )
    .then(
        function ({ results }) {
            console.log(results);
            addUsers(results);
            removeUser();
        }
    )
    .catch(
        function (err) {
            console.log(err);
        }
    )
    .finally(() => document.body.classList.toggle('_loading'));
}



function addUsers(arg) {

        const conteiner = document.getElementsByClassName('conteiner')[0];
        const ul = document.createElement('ul');

        ul.classList.add('user__outer');

        arg.forEach(function (item) {
            const li = document.createElement('li');
            li.classList.add('user__inner');
            li.innerHTML = `
            <div class="user__inner__info">
                <div class="user__inner__info-img ${item.gender === "female" ? "_female" : ''}">
                    <img src="${item.picture.large}" alt="user-img">
                </div>
                <button class="user__inner__info-button" type="button" data-id='${item.login.uuid}'></button>
                <div class="user__inner__info-name">
                    <h3>${item.name.title} ${item.name.first} ${item.name.last}</h3>
                </div>
                <div class="user__inner__info-email">
                    <p>${item.email}</p>
                </div>
            </div>
            `;
            ul.appendChild(li);
        })

        conteiner.appendChild(ul);
};

function removeUser() {
    const ul = document.querySelector('.user__outer');

    ul.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'button') {
            deleteUser(e.target);
        }
    })
}


function deleteUser (element) {

    const id = element.dataset.id;

    document.body.classList.toggle('_loading');

    fetch('https://httpstat.us/200', 
    {
        method: 'POST',
        body: JSON.stringify({ id })
    })
    .then(res => {
        console.log(res);

        if(res.ok) {
            element.parentNode.remove()
        }
    })
    .catch(
        function (err) {
            console.log(err);
        }
    )      
    .finally(() => document.body.classList.toggle('_loading'))
}


getUsers();
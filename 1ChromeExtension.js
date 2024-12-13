let myLeads=[]
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const tabBtn=document.getElementById("tab-btn")
const deleteBtn=document.getElementById("delete-btn")
const ulEl=document.getElementById("ul-el")

function render(Leads)
{
let listElement=[]
for(let i=0;i<Leads.length;i++)
{
    listElement+=
                    `<li>
                        <a target='blank' href='${Leads[i]}'>
                            ${Leads[i]}
                        </a>
                    </li>`
}
ulEl.innerHTML=listElement
}

tabBtn.addEventListener("click",function()
{
    chrome.tabs.query({active:true,currentWindow:true}, function(tabs) {
            myLeads.push(tabs[0].url)
            localStorage.setItem("myLeads", JSON.stringify(myLeads))
            render(myLeads)
        })
})

deleteBtn.addEventListener("dblclick",function()
{
    localStorage.clear()
    myLeads=[]
    render(myLeads)
})

const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage)
{
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click",function()
{
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads)
})



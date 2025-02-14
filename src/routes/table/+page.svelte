<script>
    Date.prototype.getWeekOfMonth = function(exact) {
        var month = this.getMonth()
            , year = this.getFullYear()
            , firstWeekday = new Date(year, month, 1).getDay()
            , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
            , offsetDate = this.getDate() + firstWeekday - 1
            , index = 1 // start index at 0 or 1, your choice
            , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
            , week = index + Math.floor(offsetDate / 7)
        ;
        if (exact || week < 2 + index) return week;
        return week === weeksInMonth ? index + 5 : week;
    }
    const napok = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']
    const { data } = $props()
    const adate = new Date()
    adate.week = adate.getWeekOfMonth()
    const gendateobj = (date) => ({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        weekday: (date.getDay() + 6) % 7,
        week: date.getWeekOfMonth()
    })
    const gentimeobj = (date) => ({
        hour: date.getHours(),
        minute: date.getMinutes()
    })
    const size = (event) => {
        return (event.endto.hour - event.startto.hour) * 60 + (0 * (event.endto.minute - event.startto.minute))
    }
    var adateobj = $state(gendateobj(adate))
    const xdata = data.events.map((v, i) => ({...v, 
        startdo: gendateobj(v.start), enddo: gendateobj(v.end),
        startto: gentimeobj(v.start), endto: gentimeobj(v.end)
    }))
    var fdata = $derived(xdata.filter(v => 
        v.startdo.year === adateobj.year && 
        v.startdo.month === adateobj.month && 
        v.startdo.week === adateobj.week
    ))
    const nd = (day) => {
        var od = new Date(`${adateobj.year}-${adateobj.month}-${day - adateobj.weekday + 7 * adateobj.week}`)
        if (od == 'Invalid Date') return ""
        else return od.toLocaleDateString('hu-HU')
    }
</script>
<h1 class="ui block header">
    Terembeosztás táblázat
</h1>
<div class="ui input">
    <button onclick={() => {
        adate.setDate(adate.getDate() - 7)
        adateobj = gendateobj(adate)
    }}> &leftarrow; </button>
    <input type="number" bind:value={adateobj.year} placeholder="Év" class="ev" min=2023 max=2025> -
    <input type="number" bind:value={adateobj.month} placeholder="Hónap" class="ev" min=1 max=12> -
    {#each [1,2,3,4,5] as het}
        <button class="ui small blue button {adateobj.week === het ? 'red' : ''}" onclick={() => (adateobj.week = het)}>{het}</button>
    {/each}
    <button onclick={() => {
        adate.setDate(adate.getDate() + 7)
        adateobj = gendateobj(adate)
    }}> &rightarrow; </button>
</div>
<svg width="1550" height="1500">
    {#each [0,1,2,3,4,5,6] as day}
        <text x={100 + 220 * day} y=40>{napok[day]}</text>
        <text x={87 + 220 * day} y=60>{nd(day)}</text>
        <line x1={40 + 220 * day} y1=60 x2={40 + 220 * day} y2=1500 stroke="rgba(0, 30, 40, 0.6)" stroke-width="0.6"></line>
        <line x1={220 + 220 * day} y1=60 x2={220 + 220 * day} y2=1500 stroke="rgba(0, 30, 40, 0.6)" stroke-width="0.6"></line>
    {/each}
    {#each Array.from({length: 25}).fill(0) as _, hour}
        <text y={105 + 60 * hour} x=2 stroke="red">{hour}:00</text>
        <line x1=40 y1={100 + 60 * hour} x2=1550 y2={100 + 60 * hour} stroke="rgba(0, 30, 40, 0.6)" stroke-width="0.6"></line>
        <text y={133.5 + 60 * hour} x=10 stroke="gray" class="ho">{hour}:30</text>
        <line x1=40 y1={130 + 60 * hour} x2=1550 y2={130 + 60 * hour}  stroke="rgba(0, 30, 40, 0.2)" stroke-width="0.5"></line>
    {/each}
    {#each fdata as event}
        {#if event.endto.hour === 0 }
        <rect
            fill="yellow"
            stroke="black"
            x={40 + 220 * event.startdo.weekday} y=100 width=180
            height=1398
        />
        <text 
        class="ev"
        stroke="rgb(68, 112, 112)" 
        x={50 + 220 * event.startdo.weekday} 
        y={120 + 60 * event.startto.hour + event.startto.minute}>{event.text}</text>
        <text 
        class="lo"
        stroke="rgb(168, 112, 12)"  
        x={50 + 220 * event.startdo.weekday} 
        y={120 + 60 * event.startto.hour + event.startto.minute + 15}>{event.location}</text>
        {:else}
        <rect
            fill="rgba(205, 255, 255, 0.9)"
            stroke="black"
            x={40 + 220 * event.startdo.weekday} y={100 + 60 * event.startto.hour + event.startto.minute} width=180
            height={size(event)}/>
        <text 
            class="ev"
            stroke="rgb(68, 112, 112)" 
            x={50 + 220 * event.startdo.weekday} 
            y={120 + 60 * event.startto.hour + event.startto.minute}>{event.text}</text>
        <text 
            class="lo"
            stroke="rgb(168, 112, 12)"  
            x={50 + 220 * event.startdo.weekday} 
            y={120 + 60 * event.startto.hour + event.startto.minute + 15}>{event.location}</text>
        {/if}
    {/each}
</svg>
{#if false}
    <ul>
    {#each fdata as event}
        <li>{event.startdo.year}-{event.startdo.month}-{event.startdo.day}
            {event.startto.hour}:{event.startto.minute} - {event.endto.hour}:{event.endto.minute} - {event.text}
            {event.location}
        </li>
    {/each}
    </ul>
{/if}
<style>
    .ev {
        width: 86px;
    }
    text.ho {  
        font-weight: normal;
        font-size: 10px;
    }
    text.lo {
        font-weight: normal;
        font-family: 'Courier New', Courier, monospace;
        font-size: 10px;
        text-align: center;
    }
    text.ev {
        font-weight: normal;
        font-family: 'Times New Roman', Times, serif;
        font-size: 16px;
        text-align: center;
    }
    li {
        all: unset;
        display: block;
    }
</style>
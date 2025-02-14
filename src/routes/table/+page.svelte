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
</script>
<h1 class="ui block header">
    Terembeosztás táblázat
</h1>
<div class="ui input">
    <input type="number" bind:value={adateobj.year} placeholder="Év" class="ev">
    <input type="number" bind:value={adateobj.month} placeholder="Hónap" class="ev">
    <input type="number" bind:value={adateobj.week} placeholder="Hét" class="ev" min="1" max="7">
</div>
<svg width="1800" height="1400">
    {#each fdata as event}
        {#if event.endto.hour === 0 }
        <rect
            fill="yellow"
            stroke="black"
            x={20 + 120 * event.startdo.weekday} y=0 width=90 
            height=800
        />
        {:else}
        <rect
            fill="black"
            stroke="black"
            x={20 + 100 * event.startdo.weekday} y={60 * event.startto.hour + event.startto.minute} width=90
            height={size(event)}/>
        {/if}
    {/each}
</svg>
    <ul>
    {#each fdata as event}
        <li>{event.startdo.year}-{event.startdo.month}-{event.startdo.day}
            {event.startto.hour}:{event.startto.minute} - {event.endto.hour}:{event.endto.minute} - {event.text}
            {event.location}
        </li>
    {/each}
    </ul>
<style>
    .ev {
        width: 86px;
    }
</style>
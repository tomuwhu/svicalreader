<script>
const { data } = $props()
const formattime = time => time.toLocaleTimeString('hu-HU').split(":").slice(0, 2).join(":")
</script>
<h1>Terembeosztás</h1>
<table>
    <tbody>
        <tr>
            <th>Dátum</th>
            <th class="tl">Kezdés</th>
            <th class="tm"></th>
            <th class="tr">Vége</th>
            <th>Bejegyzés</th>
            <th>Helyszín</th>
        </tr>
        {#each data.events as event}
            <tr>
                <td>{event.start.toLocaleDateString('hu-HU')}</td>
                <td class="time tl">{formattime(event.start)}</td>
                <td class="tm"> - </td>
                <td class="time tr">{formattime(event.end)}</td>
                <td class="r text">{event.text}</td>
                <td class="r text">{event.location}</td>
            </tr>
        {/each}
    </tbody>
</table>
<style>
    h1 {
        text-align: center;
    }
    table {
        border-collapse: collapse;
        margin: auto;
        text-shadow: 0px 0px 2px rgb(149, 149, 149);
    }
    td, th {
        border: 1px solid black;
        padding: 0px 10px ;
        text-align: center;
    }
    th {
        background-color: rgb(172, 222, 222);
    }
    tr:nth-child(even) {
        background-color: rgb(227, 235, 237);
    }
    td.text {
        text-align: left;
    }
    td.time {
        text-align: right;
    }
    td.tl, th.tl {
        border-right: none;
        padding-right: 0px;
    }
    td.tr, th.tr {
        border-left: none;
        padding-left: 0px;
    }
    td.tm, th.tm {
        border-left: none;
        border-right: none;
        padding: 2px;
    }
</style>
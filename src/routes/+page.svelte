<script>
const { data } = $props()
</script>
<h1>Terembeosztás</h1>
<table>
    <tbody>
        <tr>
            <th>Dátum</th>
            <th>Kezdés</th>
            <th>Vége</th>
            <th>Téma</th>
            <th>Helyszín</th>
        </tr>
        {#each data.events as event}
            <tr>
                <th>{event.start.toLocaleDateString('hu-HU')}</th>
                <td>{event.start.toLocaleTimeString('hu-HU')}</td>
                <td>{event.end.toLocaleTimeString('hu-HU')}</td>
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
    }
    td, th {
        border: 1px solid black;
        padding: 0px 10px ;
        text-align: center;
    }
    tr:nth-child(even) {
        background-color: lightgrey;
    }
    td.text {
        text-align: left;
    }
</style>
<script>
const { data } = $props()
const formattime = time => time.toLocaleTimeString('hu-HU').split(":").slice(0, 2).join(":")
</script>
<h1 class="ui block header">
    Terembeosztás
</h1>
<table class="ui very basic compact table this">
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
                <td class="right aligned">{formattime(event.start)}</td>
                <td> - </td>
                <td class="right aligned">{formattime(event.end)}</td>
                <td class="r text">{event.text}</td>
                <td class="r text">{event.location}</td>
            </tr>
        {/each}
    </tbody>
</table>
<style>
    :global body {
        text-shadow: 0px 0px 2px rgb(149, 149, 149);
        text-align: center;
    }
    table.this {
        margin: auto;
        width: fit-content;
    }
    th {
        text-align: center;
        padding: 6px;
    }
    tr:nth-child(even) {
        background-color: rgb(227, 235, 237);
    }
</style>
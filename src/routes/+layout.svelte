<script>
	let { children } = $props();
    const menu = [
        {
            name: 'Lista nézet',
            path: '/'
        },
        {
            name: 'Táblázatos nézet',
            path: '/table'
        },
        {
            name: 'Effekt',
            path: '/effect'
        }

    ]
</script>
<menu>
    {#each menu as item}
        <a href={item.path} class="ui button">{item.name}</a>
    {/each}
</menu>
{@render children()}
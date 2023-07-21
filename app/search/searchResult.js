
<SearchBox>
    {data?.pages?.map((pages) => (
        pages?.data?.data?.map((list) => (
            <SearchListItem key={list?.dealID}>
                <div>
                    <LazyLoadImage
                        onClick={() => router.push(`/detail/${list?.title}`)}
                        // src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        alt={list?.title}
                    />
                    <div>
                        <div onClick={() => router.push(`/detail/${list?.title}`)}>{list?.title}</div>
                    </div>
                </div>
            </SearchListItem>
        ))
    ))}
</SearchBox>
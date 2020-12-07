use std::fs;

fn main() {
    let input = load_file();

    let map = build_map(input);

    // for tile in (MapWalker{ map: map, position: (0,0), direction: (3, 1) }) {
    //     println!("Whee! {} {}", tile.data, tile.is_tree())
    // }

    // part 1
    println!("Route 1: {} trees in total", count_trees(map.clone(), (3, 1)));

    // part 2
    let route1 = count_trees(map.clone(), (1, 1));
    let route2 = count_trees(map.clone(), (3, 1));
    let route3 = count_trees(map.clone(), (5, 1));
    let route4 = count_trees(map.clone(), (7, 1));
    let route5 = count_trees(map.clone(), (1, 2));
    let total = route1*route2*route3*route4*route5;
    println!("Total? {} trees in total", total)

}

fn load_file() -> Vec<String>  {
    let input: Vec<String> = fs::read_to_string("input.txt").expect("Can't find input.txt!")
        .lines()
        .map(|s| s.parse().expect("parse_error"))
        .collect();
    return input;
}

pub fn count_trees(map: Map, direction: (usize, usize)) -> usize {
    let walker = MapWalker{ map: map, position: (0,0), direction: direction };
    return walker.map(|tile| tile.is_tree()).filter(|&tree| tree == true).collect::<Vec<bool>>().len();
}

pub fn build_map(data: Vec<String>) -> Map {
    let mut map: Vec<Vec<Tile>> = Vec::new();
    for row in data {
        let mut container: Vec<Tile> = Vec::new();
        for column in row.chars() {
            container.push(Tile {
                data: column
            })
        }
        map.push(container)
    }
    return Map {
        max_y: map.len(),
        max_x: map[0].len(),
        data: map
    }
}

pub struct MapWalker {
    map: Map,
    position: (usize, usize),
    direction: (usize, usize),
}
impl Iterator for MapWalker {
    type Item = Tile;
    fn next(&mut self) -> Option<Tile> {
        let (mut x, mut y) = self.position;
        let (dx, dy) = self.direction;

        x = x % self.map.max_x;

        while let Ok(tile) = self.map.tile(x, y) {
            x += dx;
            y += dy;
            self.position = (x, y);
            return Some(tile);
        }
        return None
    }
}

#[derive(Clone)]
pub struct Map {
    data: Vec<Vec<Tile>>,
    max_x: usize,
    max_y: usize,
}
impl Map {
    fn tile(&self, x: usize, y: usize) -> Result<Tile, String> {
        if x >= self.max_x || y >= self.max_y {
            return Err("Out of bounds".to_string())
        }
        return Ok(self.data[y][x])
    }
}

#[derive(Copy, Clone)]
pub struct Tile {
    data: char
}
impl Tile {
    fn is_tree(&self) -> bool {
        return self.data == '#'
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn get_test_data() -> Vec<String> {
        let test_data: Vec<String> =
            "..##.......
            #...#...#..
            .#....#..#.
            ..#.#...#.#
            .#...##..#.
            ..#.##.....
            .#.#.#....#
            .#........#
            #.##...#...
            #...##....#
            .#..#...#.#"
        .lines()
        .map(|s| s.trim().parse().expect("parse error"))
        .collect();
        return test_data;
    }

    #[test]
    fn detects_trees() {
        let test_data = get_test_data();
        let map = build_map(test_data);

        assert_eq!(map.tile(0, 1).unwrap().is_tree(), true);
        assert_eq!(map.tile(0, 0).unwrap().is_tree(), false);
        assert_eq!(map.tile(3, 0).unwrap().is_tree(), true);
        assert_eq!(map.tile(4, 4).unwrap().is_tree(), false);
    }

    #[test]
    fn counts_trees() {
        let test_data = get_test_data();
        let map = build_map(test_data);
        
        assert_eq!(count_trees(map.clone(), (3, 1)), 7)
    }

    fn multiplies_observed_trees() {
        let test_data = get_test_data();
        let map = build_map(test_data);

        let route1 = count_trees(map.clone(), (1, 1));
        let route2 = count_trees(map.clone(), (3, 1));
        let route3 = count_trees(map.clone(), (5, 1));
        let route4 = count_trees(map.clone(), (7, 1));
        let route5 = count_trees(map.clone(), (1, 2));
        let total = route1*route2*route3*route4*route5;

        
        assert_eq!(total, 336)
    }
}

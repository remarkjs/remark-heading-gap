export default function (remark, opts) {
    const {visitors} = remark.Compiler.prototype;
    const {heading} = visitors;
    
    const headings = {
        1: {before: '',   after: ''},
        2: {before: '\n', after: ''},
        3: {before: '',   after: ''},
        4: {before: '',   after: ''},
        5: {before: '',   after: ''},
        6: {before: '',   after: ''},
        ...opts
    };
    
    visitors.heading = function (node) {
        let gap = headings[node.depth];
        if (gap && gap.before || gap.after) {
            return gap.before + heading.call(this, node) + gap.after;
        }
        return heading.call(this, node);
    };
}

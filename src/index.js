export default function (remark, opts) {
    const Compiler = remark.Compiler;
    
    const headings = {
        1: {before: '',   after: ''},
        2: {before: '\n', after: ''},
        3: {before: '',   after: ''},
        4: {before: '',   after: ''},
        5: {before: '',   after: ''},
        6: {before: '',   after: ''},
        ...opts
    };

    class HeadingGapCompiler extends Compiler {
        heading (node) {
            let gap = headings[node.depth];
            if (gap && gap.before || gap.after) {
                return gap.before + super.heading(node) + gap.after;
            }
            return super.heading(node);
        }
    }

    remark.Compiler = HeadingGapCompiler;
};
